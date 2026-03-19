import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import './Contact.css';

interface AboutData {
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
}

interface Props {
  aboutData: AboutData | null;
}

export default function Contact({ aboutData }: Props) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post('http://localhost:5000/api/contact', form);
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get in Touch</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Have a project in mind or just want to say hi? Feel free to reach out.
          </p>
        </motion.div>

        <div className="contact__grid">
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="contact__info-title">Let's talk about everything!</h3>
            <p className="contact__info-text">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat about tech.
            </p>

            <div className="contact__info-items">
              {aboutData?.email && (
                <a href={`mailto:${aboutData.email}`} className="contact__info-item">
                  <HiMail className="contact__info-icon" />
                  <span>{aboutData.email}</span>
                </a>
              )}
              {aboutData?.phone && (
                <a href={`tel:${aboutData.phone}`} className="contact__info-item">
                  <HiPhone className="contact__info-icon" />
                  <span>{aboutData.phone}</span>
                </a>
              )}
              {aboutData?.location && (
                <div className="contact__info-item">
                  <HiLocationMarker className="contact__info-icon" />
                  <span>{aboutData.location}</span>
                </div>
              )}
            </div>

            <div className="contact__socials">
              {aboutData?.github && (
                <a href={aboutData.github} target="_blank" rel="noopener noreferrer" className="contact__social-link">
                  <SiGithub />
                </a>
              )}
              {aboutData?.linkedin && (
                <a href={aboutData.linkedin} target="_blank" rel="noopener noreferrer" className="contact__social-link">
                  <FaLinkedin />
                </a>
              )}
            </div>
          </motion.div>

          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="contact__form-row">
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  className="contact__input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="contact__field">
                <label className="contact__label" htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  className="contact__input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                className="contact__input"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="What's this about?"
              />
            </div>

            <div className="contact__field">
              <label className="contact__label" htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="contact__textarea"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                placeholder="Tell me more about your project..."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary contact__submit"
              disabled={status === 'sending'}
              id="contact-submit-btn"
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Message Sent!' : status === 'error' ? 'Failed. Try Again' : 'Send Message'}
            </button>

            {status === 'sent' && (
              <motion.p
                className="contact__success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thanks for reaching out! I'll get back to you soon.
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
