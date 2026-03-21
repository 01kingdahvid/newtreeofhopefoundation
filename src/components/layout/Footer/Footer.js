'use client' // Mark as Client Component for Next.js 13+

import React, { useState } from 'react'
import styles from './Footer.module.css'
import Link from 'next/link'
import programs from '@/data/programs.json' // Import programs data
import { useRouter } from 'next/navigation'
import { useEmail } from '@/hooks/useEmail'
import toast from 'react-hot-toast'

const Footer = () => {
  const router = useRouter()
  const { sendEmail, isSending } = useEmail()
  const [subscribeEmail, setSubscribeEmail] = useState('')
  const BTC = process.env.NEXT_PUBLIC_BTC_ADDRESS
  const ETH = process.env.NEXT_PUBLIC_ETH_ADDRESS
  const USDT = process.env.NEXT_PUBLIC_USDT_ADDRESS
  const shorten = (addr) => {
  if (!addr) return "Not available"
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`
}

  const handleDonateClick = () => router.push('/donate')

  const handleSubscribe = async e => {
    e.preventDefault()
    if (!subscribeEmail.trim() || !/^\S+@\S+\.\S+$/.test(subscribeEmail)) {
      toast.error('Please enter a valid email')
      return
    }

    const success = await sendEmail({
      formType: 'Newsletter Subscription',
      data: { email: subscribeEmail },
      replyTo: subscribeEmail
    })

    if (success) {
      setSubscribeEmail('')
      // toast.success('Subscribed! Check your inbox.')
    }
  }

  const copyToClipboard = async (address, label) => {
  if (!address) {
    toast.error(`${label} address not available`)
    return
  }

  try {
    await navigator.clipboard.writeText(address)
    toast.success(`${label} address copied!`)
  } catch (err) {
    toast.error('Failed to copy address')
  }
}

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* COLUMN 1 */}
        <div className={styles.col}>
          <Link href='/' className={styles.logoLink}>
            <div className={styles.logoIcon}>
              <img
                src='/images/logos/nthf-logo.png'
                alt='New Tree of Hope Foundation helping children'
                className={styles.logoImg}
              />
              <div className={styles.logoText}>
                <span>NTHF</span>
                <small>New Tree Of Hope Foundation</small>
              </div>
            </div>
          </Link>

          <ul className={styles.contact}>
            <li>📍 Seoul, South Korea</li>
            <li>📞 +82 000 000 000</li>
            <li>✉️ contact@treeofhopefoundation.org</li>
          </ul>
        </div>

        {/* COLUMN 2 */}
        <div className={styles.col}>
          <h3>OTHER WAYS TO DONATE</h3>
          <ul>
            <li
              onClick={() => copyToClipboard(BTC, 'BTC')}
              className={styles.copyItem}
            >
              BTC: {shorten(BTC)}
            </li>

            <li
              onClick={() => copyToClipboard(ETH, 'ETH')}
              className={styles.copyItem}
            >
              ETH: {shorten(ETH)}
            </li>

            <li
              onClick={() => copyToClipboard(USDT, 'USDT')}
              className={styles.copyItem}
            >
              USDT: {shorten(USDT)} (ETH Network)
            </li>
          </ul>

          <button className={styles.donateBtn} onClick={handleDonateClick}>
            DONATE
          </button>
        </div>

        {/* COLUMN 3: Quick Links */}
        <div className={styles.col}>
          <h3>QUICK LINKS</h3>
          <ul>
            <li>
              <Link href='/about-us'>ABOUT US</Link>
            </li>
            <li>
              <Link href='/our-programs'>OUR PROGRAMS</Link>
            </li>
            <li>
              <Link href='/get-involved'>GET INVOLVED</Link>
            </li>
            <li>
              <Link href='/contact-us'>CONTACT US</Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 4: Our Programs */}
        <div className={styles.col}>
          <h3>OUR PROGRAMS</h3>
          <ul>
            {programs.map(program => (
              <li key={program.id}>
                <Link href={`/our-programs/${program.slug}`}>
                  {program.title.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 5 */}
        <div className={styles.col}>
          <h3>JOIN OUR MAILING LIST</h3>
          <form onSubmit={handleSubscribe}>
            <input
              type='email'
              placeholder='Email'
              className={styles.input}
              value={subscribeEmail}
              onChange={e => setSubscribeEmail(e.target.value)}
              disabled={isSending}
            />
            <button
              type='submit'
              className={styles.subscribeBtn}
              disabled={isSending}
            >
              {isSending ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
            </button>
          </form>
          <p className={styles.note}>
            NTHF is a registered nonprofit humanitarian organization. Donations
            help support vulnerable communities worldwide.
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} New Tree of Hope Foundation. All Rights
        Reserved.
      </div>
    </footer>
  )
}

export default Footer
