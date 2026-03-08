import programs from "@/data/programs.json";
import ProgramDetail from "@/components/our-programs/ProgramDetail/ProgramDetail";

export default function ProgramDetailPage({ params }) {

  const program = programs.find(
    (p) => p.slug === params.slug
  );

  return (
    <main>
      <ProgramDetail program={program} />
    </main>
  );
}