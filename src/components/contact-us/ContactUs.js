'use client'

import React, { useState } from 'react'
import { MapPin, Mail, Phone } from 'lucide-react'
import styles from './ContactUs.module.css'
import { useEmail } from '@/hooks/useEmail'

const ContactUs = () => {
  // Form state
  const { sendEmail, isSending } = useEmail()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState({})

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const validatePhone = phone =>
    /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(
      phone
    )

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const newErrors = {}
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!validatePhone(formData.phone))
      newErrors.phone = 'Invalid phone number'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    const success = await sendEmail({
      formType: 'Contact Enquiry',
      data: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      },
      replyTo: formData.email
    })

    if (success) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }
  }

  return (
    <>
      <main>
        {/* Contact Info + Map Section */}
        <section
          className={styles.infoSection}
          style={{ backgroundColor: '#06b2f2' }}
        >
          <div className={`${styles.container} ${styles.infoGrid}`}>
            <div className={styles.infoColumn}>
              <h3 className={styles.subheading}>New Tree Of Hope Foundation</h3>
              <h2 className={styles.heading}>Want To Get In Touch?</h2>
              <p className={styles.description}>
                Please feel Free to contact us
              </p>
              <ul className={styles.contactList}>
                <li>
                  <MapPin size={20} className={styles.icon} />
                  <span>
                    Visit Us: N 19 Jingwan-gil, Eunpyeong District, Seoul 03308,
                    South Korea
                  </span>
                </li>
                <li>
                  <Mail size={20} className={styles.icon} />
                  <a
                    href='mailto:contact@newtreeofhopefoundation.org?subject=Inquiry from Website'
                    className={styles.contactLink}
                  >
                    Mail Us: contact@newtreeofhopefoundation.org
                  </a>
                </li>

                <li>
                  <Phone size={20} className={styles.icon} />
                  <a href='tel:+82292487302' className={styles.contactLink}>
                    Phone Us: +82-2-9248-7302
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.mapColumn}>
              <iframe
                title='NTHF Seoul Location'
                src='https://www.google.com/maps?q=N%2019%20Jingwan-gil%2C%20Eunpyeong-gu%2C%20Seoul%2003308&output=embed'
                allowFullScreen
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                className={styles.mapIframe}
              />
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className={styles.formSection} id='contact-form'>
          <div className={styles.container}>
            <div className={styles.formText}>
              <h3 className={styles.subheading}>New Tree Of Hope Foundation</h3>
              <h2 className={styles.heading}>SEND A MESSAGE</h2>
              <p className={styles.description}>
                Have a question or want to work together? Fill out the form
                below and we'll reply within 24 hours.
              </p>
            </div>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <input
                    type='text'
                    id='fullName'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`${errors.fullName ? styles.errorInput : ''} ${
                      styles.floatingInput
                    }`}
                    placeholder=' '
                  />
                  <label htmlFor='fullName' className={styles.floatingLabel}>
                    Full Name *
                  </label>
                  {errors.fullName && (
                    <span className={styles.errorMessage}>
                      {errors.fullName}
                    </span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className={`${errors.email ? styles.errorInput : ''} ${
                      styles.floatingInput
                    }`}
                    placeholder=' '
                  />
                  <label htmlFor='email' className={styles.floatingLabel}>
                    Email *
                  </label>
                  {errors.email && (
                    <span className={styles.errorMessage}>{errors.email}</span>
                  )}
                </div>
                <div className={styles.formGroup}>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${errors.phone ? styles.errorInput : ''} ${
                      styles.floatingInput
                    }`}
                    placeholder=' '
                  />
                  <label htmlFor='phone' className={styles.floatingLabel}>
                    Phone Number *
                  </label>
                  {errors.phone && (
                    <span className={styles.errorMessage}>{errors.phone}</span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${errors.subject ? styles.errorInput : ''} ${
                    styles.floatingInput
                  }`}
                  placeholder=' '
                />
                <label htmlFor='subject' className={styles.floatingLabel}>
                  Subject *
                </label>
                {errors.subject && (
                  <span className={styles.errorMessage}>{errors.subject}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <textarea
                  id='message'
                  name='message'
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`${errors.message ? styles.errorInput : ''} ${
                    styles.floatingTextarea
                  }`}
                  placeholder=' '
                ></textarea>
                <label htmlFor='message' className={styles.floatingLabel}>
                  Message *
                </label>
                {errors.message && (
                  <span className={styles.errorMessage}>{errors.message}</span>
                )}
              </div>

              <button
                type='submit'
                className={styles.submitBtn}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'CONTACT US NOW'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default ContactUs
