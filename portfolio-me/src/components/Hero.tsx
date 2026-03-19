import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import './Hero.css';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.08 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas ref={canvasRef} className="hero__particles" />

      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />
      <div className="hero__glow hero__glow--3" />

      <div className="hero__content container">
        <div className="hero__fade-in">
          <span className="hero__greeting">
            <span className="hero__greeting-line" />
            Hello, I'm
          </span>
        </div>

        <h1 className="hero__name hero__fade-in">
          Nitesh Kumar Sah
        </h1>

        <div className="hero__title-wrapper hero__fade-in">
          <span className="hero__title">
            Full Stack Developer
            <span className="hero__title-divider">&</span>
            AI Engineer
          </span>
        </div>

        <p className="hero__description hero__fade-in">
          Building scalable web applications and intelligent AI systems.
          <br />
          Turning complex problems into elegant, user-friendly solutions.
        </p>

        <div className="hero__cta hero__fade-in">
          <a href="#projects">
            <button className="btn btn-primary" id="view-projects-btn">
              View My Work
              <HiArrowDown />
            </button>
          </a>
          <a href="#contact">
            <button className="btn btn-outline" id="get-in-touch-btn">
              Get in Touch
            </button>
          </a>
        </div>

        <div className="hero__stats hero__fade-in">
          <div className="hero__stat">
            <span className="hero__stat-value">5+</span>
            <span className="hero__stat-label">Projects</span>
          </div>
          <div className="hero__stat-separator" />
          <div className="hero__stat">
            <span className="hero__stat-value">2+</span>
            <span className="hero__stat-label">Experience</span>
          </div>
          <div className="hero__stat-separator" />
          <div className="hero__stat">
            <span className="hero__stat-value">100+</span>
            <span className="hero__stat-label">LeetCode</span>
          </div>
        </div>
      </div>

      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <a href="#about">
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
          <span className="hero__scroll-text">Scroll Down</span>
        </a>
      </motion.div>
    </section>
  );
}
