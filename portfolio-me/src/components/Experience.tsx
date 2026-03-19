import { motion } from 'framer-motion';
import { HiBriefcase } from 'react-icons/hi';
import './Experience.css';

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  tech_stack: string[];
}

interface Props {
  data: ExperienceItem[] | null;
}

export default function Experience({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Professional experience building products and solving real-world problems.
          </p>
        </motion.div>

        <div className="experience__timeline">
          <div className="experience__timeline-line" />

          {data.map((exp, idx) => (
            <motion.div
              key={exp.id}
              className={`experience__item ${idx % 2 === 0 ? 'experience__item--left' : 'experience__item--right'}`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div className="experience__dot">
                <HiBriefcase />
              </div>

              <div className="experience__card card">
                <div className="experience__card-header">
                  <h3 className="experience__role">{exp.role}</h3>
                  <span className="experience__company">{exp.company}</span>
                </div>
                <span className="experience__duration">{exp.duration}</span>
                <p className="experience__description">{exp.description}</p>
                <div className="experience__tech">
                  {exp.tech_stack.map((tech, i) => (
                    <span key={i} className="pill">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
