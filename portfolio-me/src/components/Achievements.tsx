import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import './Achievements.css';

interface Achievement {
  id: number;
  title: string;
  description: string;
}

interface Props {
  data: Achievement[] | null;
}

export default function Achievements({ data }: Props) {
  if (!data || data.length === 0) return null;

  return (
    <section className="section achievements" id="achievements">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Achievements</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Milestones and recognitions along my journey.
          </p>
        </motion.div>

        <div className="achievements__grid">
          {data.map((ach, idx) => (
            <motion.div
              key={ach.id}
              className="achievements__card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="achievements__icon-wrapper">
                <HiStar className="achievements__icon" />
              </div>
              <h3 className="achievements__title">{ach.title}</h3>
              <p className="achievements__description">{ach.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
