'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './DonateNowSection.module.css'
import programsData from '@/data/programs.json'
import { BankOutlined } from '@ant-design/icons'
import countriesData from '@/data/countries.json'
import { useEmail } from '@/hooks/useEmail'

// ----------------------------------------------------------------------
// Environment variables
// ----------------------------------------------------------------------
const btcAddress = process.env.NEXT_PUBLIC_BTC_ADDRESS || ''
const ethAddress = process.env.NEXT_PUBLIC_ETH_ADDRESS || ''
const usdtAddress = process.env.NEXT_PUBLIC_USDT_ADDRESS || ''
const bankName = process.env.NEXT_PUBLIC_KOREAN_BANK_NAME || 'Shinhan Bank'
const bankAccountName = process.env.NEXT_PUBLIC_KOREAN_ACCOUNT_NAME || ''
const bankAccountNumber = process.env.NEXT_PUBLIC_KOREAN_ACCOUNT_NUMBER || ''

// ----------------------------------------------------------------------
// Payment methods
// ----------------------------------------------------------------------
const paymentMethods = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    icon: (
      <img
        src='/images/logos/btc-logo.png'
        alt='Bitcoin'
        className={styles.cryptoIconImg}
      />
    ),
    networks: ['Bitcoin']
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    icon: (
      <img
        src='/images/logos/eth-logo.png'
        alt='Ethereum'
        className={styles.cryptoIconImg}
      />
    ),
    networks: ['Ethereum']
  },
  {
    symbol: 'USDT',
    name: 'Tether (ERC20)',
    type: 'crypto',
    icon: (
      <img
        src='/images/logos/usdt-logo.png'
        alt='Tether'
        className={styles.cryptoIconImg}
      />
    ),
    networks: ['Ethereum']
  },
  {
    symbol: 'BANK',
    name: 'Korean Bank Transfer',
    type: 'bank',
    icon: <BankOutlined />
  }
]

// Wallet addresses (from env)
const cryptoWallets = {
  BTC: btcAddress,
  ETH: ethAddress,
  USDT: usdtAddress
}

// Exchange rates (USD per 1 unit)
const exchangeRates = {
  BTC: 67500,
  ETH: 3500,
  USDT: 1
}

const DonateNowSection = () => {
   const { sendEmail, isSending } = useEmail()
  // ---------- Loading ----------
  const [loading, setLoading] = useState(true)

  // ---------- Step ----------
  const [step, setStep] = useState(1) // 1: donation form, 2: donor info, 3: payment method, 4: payment details, 5: thank you

  // ---------- Form data ----------
  const [amountUSD, setAmountUSD] = useState('')
  const [selectedAmountPreset, setSelectedAmountPreset] = useState(null)
  const [country, setCountry] = useState('')
  const countries = countriesData.countries || []

  const sortedCountries = [
    countries.find(c => c.code === 'KR'),
    ...countries.filter(c => c.code !== 'KR')
  ]

  const [program, setProgram] = useState('')
  const [note, setNote] = useState('')
  const [coverFees, setCoverFees] = useState(true)

  // Donor info
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [anonymous, setAnonymous] = useState(false)

  // Payment method selection
  const [selectedMethod, setSelectedMethod] = useState('BTC')
  const [network, setNetwork] = useState('Ethereum')

  // Payment step
  const [copied, setCopied] = useState(false)

  // Validation errors
  const [errors, setErrors] = useState({})

  const copyTimeoutRef = useRef(null)
  const sectionRef = useRef(null)

  // ---------- Function to handle final step and send email ----------
  const goToThankYou = async () => {
  // Base donation data
  const donationData = {
    amountUSD,
    country,
    program,
    note,
    coverFees,
    selectedMethod,
    ...(!anonymous && {
      fullName: name,
      email,
      phone
    })
  }

  // Add payment destination details based on selected method
  if (selectedMethod === 'BANK') {
    donationData.bank_name = bankName;
    donationData.bank_account_name = bankAccountName;
    donationData.bank_account_number = bankAccountNumber;
  } else {
    // Crypto
    donationData.wallet_address = cryptoWallets[selectedMethod];
    // Optionally include the network
    donationData.payment_method = `${selectedMethod} (${network})`; // will appear in payment_method field
  }

  const formType = anonymous ? 'Anonymous Donation' : 'Donation Notification';
  const replyTo = anonymous ? '' : email;

  await sendEmail({
    formType,
    data: donationData,
    replyTo
  });

  setStep(5);
};

  // Scroll to section on step change
  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [step])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  // Update network when crypto changes (only for crypto methods)
  useEffect(() => {
    const method = paymentMethods.find(m => m.symbol === selectedMethod)
    if (method?.type === 'crypto' && method.networks.length > 0) {
      setNetwork(method.networks[0])
    }
  }, [selectedMethod])

  // Cleanup copy timeout
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  // ---------- Helpers ----------
  const handleAmountSelect = val => {
    setAmountUSD(val.toString())
    setSelectedAmountPreset(val)
    setErrors(prev => ({ ...prev, amount: '' }))
  }

  const handleAmountInput = e => {
    const val = e.target.value
    if (val === '' || /^\d+(\.\d{0,2})?$/.test(val)) {
      setAmountUSD(val)
      setSelectedAmountPreset(null)
      setErrors(prev => ({ ...prev, amount: '' }))
    } else {
      setErrors(prev => ({ ...prev, amount: 'Enter a valid amount' }))
    }
  }

  const copyAddress = () => {
    const address = cryptoWallets[selectedMethod]
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000)
    }
  }

  // Calculate crypto amount (only for crypto)
  const getCryptoAmount = () => {
    if (selectedMethod === 'BANK') return 0
    const usd = parseFloat(amountUSD)
    if (isNaN(usd) || usd <= 0) return 0
    const rate = exchangeRates[selectedMethod] || 1
    return usd / rate
  }

  const cryptoAmountFormatted = () => {
    const val = getCryptoAmount()
    if (val === 0) return '0'
    return val.toFixed(8)
  }

  // Step validation
  const validateStep1 = () => {
    const newErrors = {}
    const usd = parseFloat(amountUSD)
    if (isNaN(usd) || usd <= 0)
      newErrors.amount = 'Please enter a donation amount'
    if (!country) newErrors.country = 'Select a country'
    if (!program) newErrors.program = 'Select a program'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    if (anonymous) return true
    const newErrors = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Invalid email'
    if (!phone.trim()) newErrors.phone = 'Phone is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ---------- Render loading ----------
  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Preparing donation...</p>
          </div>
        </div>
      </section>
    )
  }

  // ---------- Step 1: Donation Form ----------
  const renderStep1 = () => (
    <div className={styles.card}>
      <span className={styles.badge}>GIVE NOW</span>
      <h1 className={styles.title}>CHANGE LIVES INSTANTLY</h1>

      <div className={styles.amountRow}>
        {[50, 100, 250, 500, 1000].map(val => (
          <button
            key={val}
            className={`${styles.amountBtn} ${
              selectedAmountPreset === val ? styles.selected : ''
            }`}
            onClick={() => handleAmountSelect(val)}
          >
            ${val}
          </button>
        ))}
        <input
          type='text'
          placeholder='Other'
          className={styles.amountInput}
          value={amountUSD}
          onChange={handleAmountInput}
        />
      </div>
      {errors.amount && <div className={styles.errorText}>{errors.amount}</div>}

      <select
        className={styles.select}
        value={country}
        onChange={e => setCountry(e.target.value)}
      >
        <option value=''>Select Country</option>
        {sortedCountries.map(country => (
          <option key={country.code} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      {errors.country && (
        <div className={styles.errorText}>{errors.country}</div>
      )}

      <select
        className={styles.select}
        value={program}
        onChange={e => setProgram(e.target.value)}
      >
        <option value=''>Select Program</option>
        {programsData.map(prog => (
          <option key={prog.id} value={prog.slug}>
            {prog.title}
          </option>
        ))}
      </select>
      {errors.program && (
        <div className={styles.errorText}>{errors.program}</div>
      )}

      <textarea
        className={styles.textarea}
        placeholder='Add a note to your donation (optional)'
        value={note}
        onChange={e => setNote(e.target.value)}
      />

      <label className={styles.checkbox}>
        <input
          type='checkbox'
          checked={coverFees}
          onChange={e => setCoverFees(e.target.checked)}
        />
        I&apos;d like to help cover the transaction fees
      </label>

      <button
        className={styles.primaryBtn}
        onClick={() => validateStep1() && setStep(2)}
      >
        DONATE NOW
      </button>
    </div>
  )

  // ---------- Step 2: Donor Information ----------
  const renderStep2 = () => (
    <div className={styles.card}>
      <div className={styles.headerRow}>
        <button className={styles.backButton} onClick={() => setStep(1)}>
          ←
        </button>
        <h2 className={styles.title}>Your Information</h2>
      </div>

      <label className={styles.checkbox} style={{ marginBottom: '1.5rem' }}>
        <input
          type='checkbox'
          checked={anonymous}
          onChange={e => setAnonymous(e.target.checked)}
        />
        Donate anonymously
      </label>

      <input
        className={styles.input}
        placeholder='Full Name'
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={anonymous}
      />
      {!anonymous && errors.name && (
        <div className={styles.errorText}>{errors.name}</div>
      )}

      <input
        className={styles.input}
        placeholder='Email Address'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        disabled={anonymous}
      />
      {!anonymous && errors.email && (
        <div className={styles.errorText}>{errors.email}</div>
      )}

      <input
        className={styles.input}
        placeholder='Phone Number'
        type='tel'
        value={phone}
        onChange={e => setPhone(e.target.value)}
        disabled={anonymous}
      />
      {!anonymous && errors.phone && (
        <div className={styles.errorText}>{errors.phone}</div>
      )}

      <button
        className={styles.primaryBtn}
        onClick={() => validateStep2() && setStep(3)}
      >
        Continue
      </button>
    </div>
  )

  // ---------- Step 3: Payment Method Selection ----------
  const renderStep3 = () => {
    const quickMethods = ['BTC', 'ETH', 'USDT', 'BANK']

    return (
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <button className={styles.backButton} onClick={() => setStep(2)}>
            ←
          </button>
          <h2 className={styles.title}>Make a Donation</h2>
        </div>

        {/* Quick buttons */}
        <div className={styles.quickCryptoRow}>
          {quickMethods.map(sym => {
            const method = paymentMethods.find(m => m.symbol === sym)
            return (
              <button
                key={sym}
                className={`${styles.cryptoQuickBtn} ${
                  selectedMethod === sym ? styles.active : ''
                }`}
                onClick={() => setSelectedMethod(sym)}
              >
                <span className={styles.cryptoIcon}>{method.icon}</span>{' '}
                {sym === 'BANK' ? 'Bank' : sym}
              </button>
            )
          })}
        </div>

        {/* Full select + network (network only for crypto) */}
        <div className={styles.fullSelectRow}>
          <div className={styles.cryptoSelectWrapper}>
            <select
              className={styles.cryptoSelect}
              value={selectedMethod}
              onChange={e => setSelectedMethod(e.target.value)}
            >
              {paymentMethods.map(method => (
                <option key={method.symbol} value={method.symbol}>
                  {method.name}{' '}
                  {method.symbol !== 'BANK' ? `(${method.symbol})` : ''}
                </option>
              ))}
            </select>
          </div>
          {selectedMethod !== 'BANK' && (
            <select
              className={styles.networkSelect}
              value={network}
              onChange={e => setNetwork(e.target.value)}
            >
              {paymentMethods
                .find(m => m.symbol === selectedMethod)
                ?.networks.map(net => (
                  <option key={net} value={net}>
                    {net}
                  </option>
                ))}
            </select>
          )}
        </div>

        {/* Amount display */}
        <div className={styles.totalCryptoBox}>
          {selectedMethod === 'BANK' ? (
            <>
              <span className={styles.cryptoTotalValue}>
                ${parseFloat(amountUSD || 0).toFixed(2)} USD
              </span>
              <span className={styles.usdEquivalent}>Bank Transfer</span>
            </>
          ) : (
            <>
              <span className={styles.cryptoTotalValue}>
                {cryptoAmountFormatted()}{' '}
                <span className={styles.cryptoSymbolSmall}>
                  {selectedMethod}
                </span>
              </span>
              <span className={styles.usdEquivalent}>
                ≈ ${parseFloat(amountUSD || 0).toFixed(2)} USD
              </span>
            </>
          )}
        </div>

        <button className={styles.primaryBtn} onClick={() => setStep(4)}>
          {selectedMethod === 'BANK'
            ? 'Continue with Bank Transfer'
            : `Donate ${selectedMethod}`}
        </button>
      </div>
    )
  }

  // ---------- Step 4: Payment Details ----------
  const renderStep4 = () => {
    if (selectedMethod === 'BANK') {
      // Bank transfer details
      return (
        <div className={styles.card}>
          <div className={styles.paymentContainer}>
            <div className={styles.paymentHeader}>
              <button className={styles.backButton} onClick={() => setStep(3)}>
                ←
              </button>
              <div className={styles.paymentAmount}>
                <span className={styles.bigNumber}>
                  ${parseFloat(amountUSD || 0).toFixed(2)}
                </span>
                <span className={styles.asset}>USD</span>
              </div>
              <div style={{ width: '24px' }} />
            </div>

            <p style={{ color: '#334155', margin: '0.5rem 0 0' }}>
              Transfer the amount to the Korean bank account below.
            </p>

            {/* QR Code for bank (static image) */}
            <div className={styles.qrCode}>
              <img
                src='/images/logos/Shinhan-Bank-logo.png'
                alt='Shinhan Bank logo'
              />
            </div>

            <div className={styles.bankDetailsBox}>
              <p>
                <strong>Bank:</strong> {bankName}
              </p>
              <p>
                <strong>Account Name:</strong> {bankAccountName}
              </p>
              <p>
                <strong>Account Number:</strong> {bankAccountNumber}
              </p>
            </div>

            <div className={styles.warningBox}>
              <strong>⚠️ Warning</strong>
              <p>
                The Korean bank option is only for use within South Korea.
                International transfers may not be accepted.
              </p>
            </div>

            <button className={styles.sentMoneyBtn} onClick={goToThankYou}>
              I&apos;ve sent the money
            </button>
          </div>
        </div>
      )
    }

    // Crypto payment
    const method = paymentMethods.find(m => m.symbol === selectedMethod)
    const walletAddress = cryptoWallets[selectedMethod] || ''
    const warningMessage = `Send only ${selectedMethod} to this address using the following supported networks: ${method.networks.join(
      ', '
    )}. Sending unsupported tokens or NFTs to this address may result in the loss of your donation. The address will expire after 180 days if unused.`

    return (
      <div className={styles.card}>
        <div className={styles.paymentContainer}>
          <div className={styles.paymentHeader}>
            <button className={styles.backButton} onClick={() => setStep(3)}>
              ←
            </button>
            <div className={styles.paymentAmount}>
              <span className={styles.bigNumber}>
                {cryptoAmountFormatted()}
              </span>
              <span className={styles.asset}>{selectedMethod}</span>
            </div>
            <div style={{ width: '24px' }} />
          </div>

          <p style={{ color: '#334155', margin: '0.5rem 0 0' }}>
            Use the address below to make a donation from your wallet.
          </p>

          <div className={styles.qrCode}>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${walletAddress}`}
              alt='QR code'
            />
          </div>

          <div className={styles.walletAddressBox}>
            <span style={{ wordBreak: 'break-all' }}>{walletAddress}</span>
            <button className={styles.copyBtn} onClick={copyAddress}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className={styles.warningBox}>
            <strong>⚠️ Warning</strong>
            <p>{warningMessage}</p>
          </div>

          <button className={styles.sentMoneyBtn} onClick={goToThankYou}>
            I&apos;ve sent the money
          </button>
        </div>
      </div>
    )
  }

  // ---------- Step 5: Thank You ----------
  const renderStep5 = () => (
    <div className={styles.card}>
      <div className={styles.thankYouContainer}>
        <h2 className={styles.thankYouTitle}>Thank You ❤️</h2>
        <p className={styles.thankYouMessage}>
          Your donation helps change lives.
        </p>
        <button
          className={styles.startOverBtn}
          onClick={() => {
            setStep(1)
            setAmountUSD('')
            setSelectedAmountPreset(null)
            setCountry('')
            setProgram('')
            setNote('')
            setCoverFees(false)
            setName('')
            setEmail('')
            setPhone('')
            setAnonymous(false)
            setSelectedMethod('BTC')
          }}
        >
          Start Over
        </button>
      </div>
    </div>
  )

  return (
    <section className={styles.section} ref={sectionRef}>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderStep4()}
      {step === 5 && renderStep5()}
    </section>
  )
}

export default DonateNowSection
