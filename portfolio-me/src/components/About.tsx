import { motion } from 'framer-motion';
import { HiLocationMarker, HiAcademicCap, HiCode } from 'react-icons/hi';
import './About.css';

interface AboutData {
  name: string;
  title: string;
  bio: string;
  location: string;
  education: string;
}

interface Props {
  data: AboutData | null;
}

export default function About({ data }: Props) {
  if (!data) return null;

  const infoItems = [
    { icon: <HiLocationMarker />, label: 'Location', value: data.location },
    { icon: <HiAcademicCap />, label: 'Education', value: 'B.E. Computer Engineering — Thapathali Campus, TU' },
    { icon: <HiCode />, label: 'Focus', value: 'Full Stack Development & AI/ML Engineering' },
  ];

  return (
    <section className="section about" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            A passionate developer who loves building things that live on the internet.
          </p>
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="about__bio">{data.bio}</p>

            <div className="about__info-list">
              {infoItems.map((item, idx) => (
                <div key={idx} className="about__info-item">
                  <span className="about__info-icon">{item.icon}</span>
                  <div>
                    <span className="about__info-label">{item.label}</span>
                    <span className="about__info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about__visual"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="about__code-block">
              <div className="about__code-header">
                <span className="about__code-dot about__code-dot--red" />
                <span className="about__code-dot about__code-dot--yellow" />
                <span className="about__code-dot about__code-dot--green" />
                <span className="about__code-filename">nitesh.ts</span>
              </div>
              <pre className="about__code-content">
{`const nitesh = {
  role: "Full Stack Dev & AI Engineer",
  languages: ["TypeScript", "Python", "SQL"],
  currentFocus: "AI-Powered Web Apps",
  funFact: "Won 1st place at my first hackathon! 🏆",
  status: "Open to opportunities ✨"
};`}
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
