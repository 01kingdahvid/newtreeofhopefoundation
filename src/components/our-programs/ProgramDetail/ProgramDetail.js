import programs from '@/data/programs.json'
import PageHero from '@/components/shared/PageHero/PageHero'

export default function ProgramDetail ({ program }) {
  if (!program) {
    return <div>Program not found</div>
  }

  return (
    <div>
      <PageHero
        title={program.title}
        subtitle={program.subtitle}
        image={program?.image}
      />

      <h1>{program.title}</h1>
      <p>{program.tagline}</p>

      <img src={program?.image} alt={program.title} />

      <section>
        <h2>{program.overview?.title}</h2>
        <p>{program.overview?.content}</p>
      </section>
    </div>
  )
}
