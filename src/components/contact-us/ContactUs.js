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
  const validatePhone = phone => /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/.test(phone)

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
    else if (!validatePhone(formData.phone)) newErrors.phone = 'Invalid phone number'
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
                    Visit Us: Iqbal Town Near (Chashma Town Riksha Stop)
                    Islamabad
                  </span>
                </li>
                <li>
                  <Mail size={20} className={styles.icon} />
                  <span>Mail Us: nabeelghauri3@gmail.com</span>
                </li>
                <li>
                  <Phone size={20} className={styles.icon} />
                  <span>Phone Us: +92 (313) 7740449</span>
                </li>
              </ul>
            </div>
            <div className={styles.mapColumn}>
              <iframe
                title='Seoul Map'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.919123456789!2d126.9780!3d37.5665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2d3c8d591ed%3A0x7c5d1b7f1f3f1f3f!2sSeoul%2C%20South%20Korea!5e0!3m2!1sen!2s!4v123456789'
                allowFullScreen
                loading='lazy'
                className={styles.mapIframe}
              ></iframe>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className={styles.formSection}>
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

              <button type='submit' className={styles.submitBtn} disabled={isSending}>
                CONTACT US NOW
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

export default ContactUs
