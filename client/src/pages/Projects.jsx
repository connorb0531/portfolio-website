import { projects } from "../data/projects";
import ProjectSection from "../components/ProjectSection";

export default function Projects() {
  return (
    <div id="projects" className="flex flex-col items-center min-h-screen px-4 py-12 max-w-screen-2xl mx-auto">
      {/* Page Title */}
      <h2 className="text-4xl font-bold text-center">
        Projects
      </h2>

      <main className="snap-y snap-mandatory">
        {projects.map((p, i) => (
          <ProjectSection
            key={p.id}
            index={i + 1}        
            title={p.title}
            blurb={p.blurb}
            image={p.image}
            link={p.link}
          />
        ))}
      </main>
    </div>
  );
}
