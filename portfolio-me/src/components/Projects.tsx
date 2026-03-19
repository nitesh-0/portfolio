import { motion } from 'framer-motion';
import { HiExternalLink, HiLightningBolt } from 'react-icons/hi';
import './Projects.css';

interface Project {
  id: number;
  name: string;
  description: string;
  tech_stack: string[];
  highlights: string[];
  link: string;
}

interface Props {
  data: Project[] | null;
}

export default function Projects({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            A selection of projects I've built — from AI research to full-stack platforms.
          </p>
        </motion.div>

        <div className="projects__grid">
          {data.map((project, idx) => (
            <motion.div
              key={project.id}
              className="projects__card card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="projects__card-number">
                {String(idx + 1).padStart(2, '0')}
              </div>

              <h3 className="projects__card-title">{project.name}</h3>
              <p className="projects__card-description">{project.description}</p>

              {project.highlights && project.highlights.length > 0 && (
                <div className="projects__highlights">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="projects__highlight">
                      <HiLightningBolt className="projects__highlight-icon" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="projects__card-footer">
                <div className="projects__tech">
                  {project.tech_stack.map((tech, i) => (
                    <span key={i} className="pill">{tech}</span>
                  ))}
                </div>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="projects__link">
                    <HiExternalLink />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
