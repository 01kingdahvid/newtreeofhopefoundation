import styles from './FeaturedLocalProject.module.css'

const projects = [
  {
    title: 'Food Pantry',
    icon: (
      <img
        src="/images/shared/local-project-food-1.png"
        alt='Food Pantry'
        className={styles.icon}
      />
    )
  },
  {
    title: 'Homeless Outreach',
    icon: (
      <img
        src="/images/shared/local-project-education-2.png"
        alt='Homeless Outreach'
        className={styles.icon}
      />
    )
  },
  {
    title: 'Emergency Assistance',
    icon: (
      <img
        src="/images/shared/local-project-assistance-1.png"
        alt='Emergency Assistance'
        className={styles.icon}
      />
    )
  },
  {
    title: 'Seasonal Distribution',
    icon: (
      <img
        src="/images/shared/local-project-seasonal-1.png"
        alt='Seasonal Distribution'
        className={styles.icon}
      />
    )
  }
]

export default function FeaturedLocalProject () {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.subheading}>FEATURED LOCAL PROJECTS</p>

        <h2 className={styles.heading}>
          NTHF&apos;S LOCAL PROJECTS IN THE USA
        </h2>

        <p className={styles.description}>
          NTHF helps families in need right here at home — from food pantries to
          family emergency support. These programs are especially active in
          Texas and other underserved areas.
        </p>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <div key={i} className={styles.card}>
              {project.icon}
              <span>{project.title}</span>
            </div>
          ))}
        </div>

        <button className={styles.button}>→ VIEW U.S. PROGRAMS</button>
      </div>

      {/* Fixed Translate Button */}
      <a
        href='https://translate.google.com/?sl=auto&tl=ko'
        target='_blank'
        className={styles.translate}
        aria-label='Translate to Korean'
      >
        <svg viewBox='0 0 24 24'>
          <path d='M12 3L4 7v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V7l-8-4z' />
          <path d='M9 12h6M12 9v6' />
        </svg>
      </a>
    </section>
  )
}
