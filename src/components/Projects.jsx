import zenMapperLogo from "./Images/zen-mapper-logo.png";
import pythonLogo from "./Images/python-logo-only.png";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Zen Sight",
      description:
        "Zen Sight is a simplicial complex visualization tool which pairs nicely with Zen Mapper.",
      technologies: ["Python", "React", "Flask"],
      githubUrl: "https://github.com/Jamiller137/zen-sight",
      liveUrl: "https://pypi.org/project/zen-sight/",
      image: pythonLogo,
    },
    {
      id: 2,
      title: "Zen Mapper",
      description:
        "Zen Mapper is a minimal implementation of the TDA Mapper algorithm written by Dr. Ethan Rooke.",
      technologies: ["Python"],
      githubUrl:
        "https://github.com/zen-mapper/zen-mapper/tree/main/packages/zen-mapper",
      liveUrl: "https://zen-mapper.github.io/zen-mapper/",
      image: zenMapperLogo,
    },
    {
      id: 3,
      title: "Kaiju Mapper",
      description:
        "An extension of Zen Mapper which provides plugins for various TDA Mapper workflows.",
      technologies: ["Python"],
      githubUrl:
        "https://github.com/zen-mapper/zen-mapper/tree/main/packages/kaiju-mapper",
      liveUrl: "https://pypi.org/project/kaiju-mapper/",
      image: pythonLogo,
    },
  ];

  return (
    <section className="section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
