import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

// Base API URL configuration supporting local development and Vercel environments
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface AboutData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  education: string;
}

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  tech_stack: string[];
}

interface Project {
  id: number;
  name: string;
  description: string;
  tech_stack: string[];
  highlights: string[];
  link: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
}

function App() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [skills, setSkills] = useState<Record<string, Skill[]> | null>(null);
  const [experience, setExperience] = useState<ExperienceItem[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [achievements, setAchievements] = useState<Achievement[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutRes, skillsRes, expRes, projRes, achRes] = await Promise.all([
          axios.get(`${API_URL}/about`),
          axios.get(`${API_URL}/skills`),
          axios.get(`${API_URL}/experience`),
          axios.get(`${API_URL}/projects`),
          axios.get(`${API_URL}/achievements`),
        ]);
        setAbout(aboutRes.data);
        setSkills(skillsRes.data);
        setExperience(expRes.data);
        setProjects(projRes.data);
        setAchievements(achRes.data);
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="app-loader">
        <div className="app-loader__spinner" />
        <p className="app-loader__text">Loading portfolio...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About data={about} />
        <Experience data={experience} />
        <Projects data={projects} />
        <Skills data={skills} />
        <Achievements data={achievements} />
        <Contact aboutData={about} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
