import emailjs from '@emailjs/browser'

// ----------------------------------------------------------------------
// Field label map (canonical key → display label)
// ----------------------------------------------------------------------
const FIELD_LABELS = {
  from_name: 'Full Name',
  from_email: 'Email Address',
  phone: 'Phone Number',
  country: 'Country of Residence',
  subject: 'Subject',
  message: 'Message',
  program: 'Program / Cause',
  donation_amount: 'Donation Amount (USD)',
  payment_method: 'Payment Method',
  note: 'Note to Donation',
  cover_fees: 'Cover Transaction Fees',
  wallet_address: 'Wallet Address (Crypto)',
  bank_name: 'Bank Name',
  bank_account_name: 'Account Name',
  bank_account_number: 'Account Number'
}

// ----------------------------------------------------------------------
// Section definitions – order & grouping for the email body
// ----------------------------------------------------------------------
const SECTIONS = [
  {
    key: 'contact',
    emoji: '📞',
    title: 'Contact Details',
    fields: ['from_name', 'from_email', 'phone', 'country']
  },
  {
    key: 'donation',
    emoji: '❤️',
    title: 'Donation Information',
    fields: [
      'program',
      'donation_amount',
      'payment_method',
      'note',
      'cover_fees'
    ]
  },
  {
    key: 'destination',
    emoji: '📍',
    title: 'Payment Destination',
    fields: [
      'wallet_address',
      'bank_name',
      'bank_account_name',
      'bank_account_number'
    ]
  },
  {
    key: 'enquiry',
    emoji: '📝',
    title: 'Enquiry Details',
    fields: ['subject', 'message']
  },
  {
    key: 'subscription',
    emoji: '📧',
    title: 'Newsletter Subscription',
    fields: ['from_email']
  }
]

// ----------------------------------------------------------------------
// Normalise raw form data → canonical field map
// ----------------------------------------------------------------------
function normalise (data) {
  return {
    from_name: data.from_name || data.fullName || undefined,
    from_email: data.from_email || data.email,
    phone: data.phone || data.phoneNumber,
    country: data.country,
    subject: data.subject,
    message: data.message,
    program: data.program,
    donation_amount: data.donation_amount || data.amountUSD,
    payment_method: data.payment_method || data.selectedMethod,
    note: data.note,
    cover_fees: data.cover_fees
      ? data.cover_fees === true
        ? 'Yes'
        : data.cover_fees
      : undefined,
    wallet_address: data.wallet_address,
    bank_name: data.bank_name,
    bank_account_name: data.bank_account_name,
    bank_account_number: data.bank_account_number
  }
}

// ----------------------------------------------------------------------
// Build the section‑based HTML fragment (only filled fields)
// ----------------------------------------------------------------------
function buildDynamicContent (data) {
  const normalised = normalise(data)

  const filled = Object.fromEntries(
    Object.entries(normalised).filter(
      ([, v]) => v !== undefined && v !== null && String(v).trim() !== ''
    )
  )

  let html = ''

  SECTIONS.forEach(section => {
    const rows = section.fields
      .filter(key => filled[key] !== undefined)
      .map(key => ({ label: FIELD_LABELS[key] || key, value: filled[key] }))

    if (rows.length === 0) return

    html += `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
        <tr>
          <td style="
            background:#f0f4fb;
            border-left:4px solid #1aa2cc;
            padding:10px 16px;
            border-radius:0 6px 6px 0;
            font-size:14px;
            font-weight:bold;
            color:#1a5c7a;
            letter-spacing:0.5px;
          ">
            ${section.emoji}&nbsp;&nbsp;${section.title.toUpperCase()}
          </td>
        </tr>
      </table>

      <table width="100%" cellpadding="0" cellspacing="0"
        style="margin-top:8px;border-collapse:collapse;">
    `

    rows.forEach(({ label, value }, i) => {
      const rowBg = i % 2 === 0 ? '#ffffff' : '#f9fafc'
      const safeValue = String(value).replace(/\n/g, '<br>')

      html += `
        <tr style="background:${rowBg};">
          <td style="
            padding:10px 14px;
            width:38%;
            font-size:13px;
            font-weight:bold;
            color:#555555;
            vertical-align:top;
            border-bottom:1px solid #eaecf0;
          ">${label}</td>
          <td style="
            padding:10px 14px;
            font-size:13px;
            color:#222222;
            vertical-align:top;
            border-bottom:1px solid #eaecf0;
          ">${safeValue}</td>
        </tr>
      `
    })

    html += `</table>`
  })

  return html
}

// ----------------------------------------------------------------------
// Universal email sender
// ----------------------------------------------------------------------
export async function sendUniversalEmail ({
  formType = 'General Enquiry',
  data = {},
  replyTo = ''
}) {
  const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_MASTER
  const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error('EmailJS env vars missing:', {
      SERVICE_ID: !!SERVICE_ID,
      TEMPLATE_ID: !!TEMPLATE_ID,
      PUBLIC_KEY: !!PUBLIC_KEY
    })
    return {
      success: false,
      error: 'Email service is not configured. Please contact support.'
    }
  }

  const templateParams = {
    form_type: formType,
    from_name:
      data.from_name ||
      data.fullName ||
      [data.first_name, data.last_name].filter(Boolean).join(' ') ||
      'Website Visitor',
    dynamic_content: buildDynamicContent(data),
    time: new Date().toLocaleString('en-GB', {
      dateStyle: 'full',
      timeStyle: 'short'
    }),
    reply_to: replyTo || data.from_email || data.email || ''
  }

  try {
    // ✅ Pass publicKey directly here — no need for emailjs.init()
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY
    })
    return { success: true, result }
  } catch (error) {
    console.error('EmailJS send failed:', {
      message: error?.message,
      text: error?.text,
      status: error?.status
    })
    return {
      success: false,
      error: error?.text || error?.message || 'Failed to send email'
    }
  }
}
