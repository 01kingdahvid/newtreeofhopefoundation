// app/(pages)/partnership/page.jsx
'use client'

import styles from './Partnership.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Partnership () {
  const [visible, setVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => setVisible(true), 100) // light delay for smooth entry
  }, [])

  return (
    <section className={styles.partnership}>
      <div className={styles.container}>
        
        {/* IMAGE */}
        <div
          className={`${styles.imageWrapper} ${
            visible ? styles.fadeInLeft : ''
          }`}
        >
          <img
            src='/images/shared/partner.jpg'
            alt='NTHF Partnership'
            className={styles.image}
          />
        </div>

        {/* CONTENT */}
        <div
          className={`${styles.content} ${
            visible ? styles.fadeInRight : ''
          }`}
        >
          <h1>Partnerships and Community Support</h1>

          <p>
            <strong>New Tree of Hope Foundation (NTHF)</strong> is committed to
            improving the lives of orphaned children under our care. Through
            educational support, essential resources, and nurturing programs, we
            empower every child to grow with confidence and hope.
          </p>

          <p>
            Our impact is made possible through strong collaborations with
            individuals and organizations who share our mission. Together, we
            create opportunities, provide care, and build a brighter future for
            every child in NTHF.
          </p>

          <p>
            We are always open to meaningful partnerships that help expand our
            reach and deepen our impact in the lives of vulnerable children.
          </p>

          {/* CTA BUTTONS */}
          <div className={styles.ctaGroup}>
            <button
              className={styles.primaryBtn}
              onClick={() => router.push('/contact-us#contact-form')}
            >
              Become a Partner
            </button>

            <button
              className={styles.secondaryBtn}
              onClick={() => router.push('/donate')}
            >
              Sponsor a Child
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}