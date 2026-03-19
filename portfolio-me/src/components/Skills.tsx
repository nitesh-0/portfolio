import { motion } from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiTailwindcss,
  SiNodedotjs, SiExpress, SiFastapi, SiFlask, SiSocketdotio,
  SiPostgresql, SiMongodb, SiPrisma, SiDocker,
  SiPytorch, SiOpencv, SiPython, SiGit, SiVercel, SiPostman
} from 'react-icons/si';
import { HiCube, HiChip } from 'react-icons/hi';
import './Skills.css';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

interface Props {
  data: Record<string, Skill[]> | null;
}

const iconMap: Record<string, React.ReactNode> = {
  'React.js': <SiReact />,
  'Next.js': <SiNextdotjs />,
  'TypeScript': <SiTypescript />,
  'JavaScript (ES6+)': <SiJavascript />,
  'HTML5 & CSS3': <SiHtml5 />,
  'Tailwind CSS': <SiTailwindcss />,
  'Fabric.js': <HiCube />,
  'Node.js': <SiNodedotjs />,
  'Express.js': <SiExpress />,
  'FastAPI': <SiFastapi />,
  'Flask': <SiFlask />,
  'REST APIs': <HiChip />,
  'WebSockets / Socket.IO': <SiSocketdotio />,
  'Cloudflare Workers': <HiCube />,
  'PostgreSQL': <SiPostgresql />,
  'MongoDB': <SiMongodb />,
  'Prisma ORM': <SiPrisma />,
  'Mongoose': <SiMongodb />,
  'PyTorch': <SiPytorch />,
  'OpenCV': <SiOpencv />,
  'Hugging Face Transformers': <HiChip />,
  'YOLOv8': <SiPython />,
  'LLMs (Llama, Gemini)': <HiChip />,
  'Meta SAM': <HiChip />,
  'Git / GitHub': <SiGit />,
  'Docker': <SiDocker />,
  'Vercel': <SiVercel />,
  'Render': <HiCube />,
  'Postman': <SiPostman />,
  'VS Code': <HiCube />,
};

const categoryColors: Record<string, string> = {
  'Frontend': '#60a5fa',
  'Backend': '#34d399',
  'Database': '#f59e0b',
  'AI / ML': '#a78bfa',
  'Tools & DevOps': '#f472b6',
};

export default function Skills({ data }: Props) {
  if (!data) return null;

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Technologies I've been working with across the full stack and beyond.
          </p>
        </motion.div>

        <div className="skills__categories">
          {Object.entries(data).map(([category, skills], catIdx) => (
            <motion.div
              key={category}
              className="skills__category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
            >
              <div className="skills__category-header">
                <div
                  className="skills__category-indicator"
                  style={{ background: categoryColors[category] || '#60a5fa' }}
                />
                <h3 className="skills__category-title">{category}</h3>
                <span className="skills__category-count">{skills.length} skills</span>
              </div>

              <div className="skills__grid">
                {skills.map((skill, idx) => (
                  <motion.div
                    key={skill.id}
                    className="skills__item"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                  >
                    <span
                      className="skills__item-icon"
                      style={{ color: categoryColors[category] || '#60a5fa' }}
                    >
                      {iconMap[skill.name] || <HiCube />}
                    </span>
                    <span className="skills__item-name">{skill.name}</span>
                    <div className="skills__item-bar-bg">
                      <motion.div
                        className="skills__item-bar"
                        style={{ background: categoryColors[category] || '#60a5fa' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.05 + 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
