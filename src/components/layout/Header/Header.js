'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

export default function Header () {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about-us', label: 'About Us' },
    { href: '/our-programs', label: 'Our Programs' },
    { href: '/where-we-work', label: 'Where We Work' },
    { href: '/contact-us', label: 'Contact Us' }
  ]

  return (
    <>
      <header className={styles.header}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <p>🌙 Never forget a night – Automate your Ramadan Giving</p>
          <button>Schedule My Giving</button>
        </div>

        {/* Navbar */}
        <nav className={styles.navbar}>
          {/* Logo */}
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

          {/* Desktop Nav Links */}
          <ul className={styles.navLinks}>
            {navLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.navLink} ${
                    pathname === link.href ? styles.active : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions (Donate Button) */}
          <div className={styles.actions}>
            <Link href='/donate'>
              <button className={styles.donate}>Donate</button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className={styles.menuButton} onClick={toggleMobileNav}>
            {mobileNavOpen ? '✕' : '☰'}
          </button>
        </nav>

        {/* Mobile Nav Links (Centered Div Below Navbar) */}
        {mobileNavOpen && (
          <div className={styles.mobileNavLinks}>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileNavLink} ${
                  pathname === link.href ? styles.active : ''
                }`}
                onClick={toggleMobileNav}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href='/donate'
              className={styles.mobileDonate}
              onClick={toggleMobileNav}
            >
              Donate
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
