import pool from './db.js';

async function seed() {
  const client = await pool.connect();

  try {
    console.log('🌱 Starting database seed...');

    // Drop tables if they exist
    await client.query(`
      DROP TABLE IF EXISTS messages CASCADE;
      DROP TABLE IF EXISTS achievements CASCADE;
      DROP TABLE IF EXISTS projects CASCADE;
      DROP TABLE IF EXISTS experience CASCADE;
      DROP TABLE IF EXISTS skills CASCADE;
      DROP TABLE IF EXISTS about CASCADE;
    `);

    // Create tables
    await client.query(`
      CREATE TABLE about (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        title VARCHAR(200) NOT NULL,
        bio TEXT,
        email VARCHAR(100),
        phone VARCHAR(20),
        linkedin VARCHAR(200),
        github VARCHAR(200),
        location VARCHAR(100),
        education TEXT
      );

      CREATE TABLE skills (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL,
        proficiency INT DEFAULT 80
      );

      CREATE TABLE experience (
        id SERIAL PRIMARY KEY,
        company VARCHAR(100) NOT NULL,
        role VARCHAR(100) NOT NULL,
        duration VARCHAR(50),
        description TEXT,
        tech_stack TEXT[],
        sort_order INT DEFAULT 0
      );

      CREATE TABLE projects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        tech_stack TEXT[],
        highlights TEXT[],
        link VARCHAR(200),
        sort_order INT DEFAULT 0
      );

      CREATE TABLE achievements (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT,
        sort_order INT DEFAULT 0
      );

      CREATE TABLE messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        subject VARCHAR(200),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('✅ Tables created');

    // Seed about
    await client.query(`
      INSERT INTO about (name, title, bio, email, phone, linkedin, github, location, education)
      VALUES (
        'Nitesh Kumar Sah',
        'Full Stack Developer & AI Engineer',
        'I am a 4th-year Computer Engineering student at Thapathali Campus, Tribhuvan University, passionate about building scalable web applications and intelligent AI systems. With experience spanning full-stack development, real-time systems, and cutting-edge AI/ML research, I love turning complex problems into elegant, user-friendly solutions. Currently interning at Fagoon AI where I architect dual-agent AI systems.',
        'nitesh.078bct026@tcioe.edu.np',
        '+977-9764802485',
        'https://linkedin.com/in/nitesh-sah-87b823304/',
        'https://github.com/nitesh-0',
        'Imadol, Lalitpur, Nepal',
        'Bachelor of Computer Engineering — Thapathali Campus, Tribhuvan University (Expected Graduation: 2026). Relevant Coursework: Deep Learning, Artificial Intelligence, Web Development, Data Structures, Software Engineering.'
      )
    `);
    console.log('✅ About data seeded');

    // Seed skills
    const skills = [
      // Frontend
      { name: 'React.js', category: 'Frontend', proficiency: 92 },
      { name: 'Next.js', category: 'Frontend', proficiency: 85 },
      { name: 'TypeScript', category: 'Frontend', proficiency: 90 },
      { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 93 },
      { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 95 },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 90 },
      { name: 'Fabric.js', category: 'Frontend', proficiency: 75 },
      // Backend
      { name: 'Node.js', category: 'Backend', proficiency: 90 },
      { name: 'Express.js', category: 'Backend', proficiency: 88 },
      { name: 'FastAPI', category: 'Backend', proficiency: 80 },
      { name: 'Flask', category: 'Backend', proficiency: 75 },
      { name: 'REST APIs', category: 'Backend', proficiency: 92 },
      { name: 'WebSockets / Socket.IO', category: 'Backend', proficiency: 85 },
      { name: 'Cloudflare Workers', category: 'Backend', proficiency: 70 },
      // Databases
      { name: 'PostgreSQL', category: 'Database', proficiency: 88 },
      { name: 'MongoDB', category: 'Database', proficiency: 82 },
      { name: 'Prisma ORM', category: 'Database', proficiency: 85 },
      { name: 'Mongoose', category: 'Database', proficiency: 80 },
      // AI/ML
      { name: 'PyTorch', category: 'AI / ML', proficiency: 82 },
      { name: 'Hugging Face Transformers', category: 'AI / ML', proficiency: 80 },
      { name: 'OpenCV', category: 'AI / ML', proficiency: 78 },
      { name: 'YOLOv8', category: 'AI / ML', proficiency: 80 },
      { name: 'LLMs (Llama, Gemini)', category: 'AI / ML', proficiency: 82 },
      { name: 'Meta SAM', category: 'AI / ML', proficiency: 75 },
      // Tools
      { name: 'Git / GitHub', category: 'Tools & DevOps', proficiency: 90 },
      { name: 'Docker', category: 'Tools & DevOps', proficiency: 80 },
      { name: 'Vercel', category: 'Tools & DevOps', proficiency: 85 },
      { name: 'Render', category: 'Tools & DevOps', proficiency: 78 },
      { name: 'Postman', category: 'Tools & DevOps', proficiency: 85 },
      { name: 'VS Code', category: 'Tools & DevOps', proficiency: 95 },
    ];

    for (const skill of skills) {
      await client.query(
        'INSERT INTO skills (name, category, proficiency) VALUES ($1, $2, $3)',
        [skill.name, skill.category, skill.proficiency]
      );
    }
    console.log('✅ Skills seeded');

    // Seed experience
    const experiences = [
      {
        company: 'Fagoon AI',
        role: 'Full Stack Intern (AI Focus)',
        duration: 'Jan 2026 – Present',
        description: 'Architected a Dual-Agent AI system using Llama 3.3 for conversational shopping assistant and Gemini for business intelligence analytics. Built full-stack features integrating AI capabilities into production applications.',
        tech_stack: ['Llama 3.3', 'Gemini', 'React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
        sort_order: 1,
      },
      {
        company: 'Freelance',
        role: 'AI/CV Developer — Rug Visualizer Pro v3.0',
        duration: '2024 – 2025',
        description: 'Developed an advanced rug visualization tool using Meta SAM for real-time furniture segmentation and perspective-accurate rug overlay. Built FastAPI backend with OpenCV image processing pipeline for production deployment.',
        tech_stack: ['Meta SAM', 'FastAPI', 'OpenCV', 'Python', 'Fabric.js', 'React.js'],
        sort_order: 2,
      },
    ];

    for (const exp of experiences) {
      await client.query(
        'INSERT INTO experience (company, role, duration, description, tech_stack, sort_order) VALUES ($1, $2, $3, $4, $5, $6)',
        [exp.company, exp.role, exp.duration, exp.description, exp.tech_stack, exp.sort_order]
      );
    }
    console.log('✅ Experience seeded');

    // Seed projects
    const projects = [
      {
        name: 'Fabulous Handicraft',
        description: 'A premium, full-stack e-commerce platform for a handicrafts store built during my internship. It features a modern, responsive UI and a robust backend.',
        tech_stack: ['React.js', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
        highlights: ['Production e-commerce platform', 'Built during internship at Fagoon AI', 'Modern Next.js architecture'],
        link: 'https://fabuloushandicraft.com/',
        sort_order: 1,
      },
      {
        name: 'LocalLink',
        description: 'Full-stack marketplace platform with real-time chat functionality, Socket.IO-powered notifications, Cloudinary image uploads, and secure JWT-based authentication. Features scalable Node.js backend with Prisma ORM.',
        tech_stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Socket.IO', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma'],
        highlights: ['Real-time chat with Socket.IO', 'Unread message tracking', 'Secure JWT auth flow', 'Cloudinary image uploads'],
        link: 'https://local-link.vercel.app/',
        sort_order: 2,
      },
      {
        name: 'Plug-and-Play RetNet',
        description: 'Research project replacing quadratic attention with linear-complexity RetNet in TimeSformer video transformers. Achieved 22.6% GPU memory reduction and faster training while maintaining competitive accuracy on video classification tasks.',
        tech_stack: ['PyTorch', 'TimeSformer', 'RetNet', 'Python', 'CUDA'],
        highlights: ['22.6% GPU memory reduction', 'Linear-time video classification', 'Novel architecture modification'],
        link: '',
        sort_order: 3,
      },
      {
        name: 'PragyaBin',
        description: 'AI-powered waste management system that won 1st Place at the "Bin There, Hacked That!" Hackathon 2025. Features real-time YOLOv8 computer vision for waste classification with a responsive React dashboard.',
        tech_stack: ['React.js', 'Node.js', 'PostgreSQL', 'Python', 'YOLOv8', 'OpenCV'],
        highlights: ['🏆 1st Place — Hackathon Winner', 'Real-time waste classification', 'YOLOv8 computer vision', 'Full-stack integration'],
        link: '',
        sort_order: 4,
      },
      {
        name: 'MeetBrief',
        description: 'Government meeting summarizer with an NLP pipeline using WhisperX for audio transcription and BART for abstractive summarization. Designed clean interfaces for browsing transcripts and AI-generated summaries.',
        tech_stack: ['React.js', 'Python', 'WhisperX', 'BART', 'PostgreSQL', 'FastAPI'],
        highlights: ['WhisperX audio transcription', 'BART abstractive summarization', 'Government-grade pipeline'],
        link: '',
        sort_order: 5,
      },
      {
        name: 'Rug Visualizer Pro v3.0',
        description: 'Advanced augmented reality rug visualization tool using Meta SAM for real-time furniture segmentation and MiDaS for depth estimation. Enables perspective-accurate rug overlay on room images.',
        tech_stack: ['Meta SAM', 'MiDaS', 'FastAPI', 'OpenCV', 'Fabric.js', 'React.js', 'Python'],
        highlights: ['Meta SAM segmentation', 'MiDaS depth estimation', 'Real-time AR overlay', 'Production deployed'],
        link: '',
        sort_order: 6,
      },
    ];

    for (const proj of projects) {
      await client.query(
        'INSERT INTO projects (name, description, tech_stack, highlights, link, sort_order) VALUES ($1, $2, $3, $4, $5, $6)',
        [proj.name, proj.description, proj.tech_stack, proj.highlights, proj.link, proj.sort_order]
      );
    }
    console.log('✅ Projects seeded');

    // Seed achievements
    const achievements = [
      {
        title: '🏆 1st Place — Bin There, Hacked That! Hackathon 2025',
        description: 'Won first place with PragyaBin, an AI-powered waste management system using YOLOv8 for real-time waste classification.',
        sort_order: 1,
      },
      {
        title: '📚 Completed 0-100 Full Stack & DevOps Cohort',
        description: 'Completed the comprehensive Full Stack and DevOps cohort by Harkirat Singh, covering React, Node.js, databases, DevOps, and system design.',
        sort_order: 2,
      },
      {
        title: '💻 100+ LeetCode Problems Solved',
        description: 'Consistently practicing Data Structures & Algorithms with 100+ problems solved on LeetCode, focusing on arrays, trees, graphs, and dynamic programming.',
        sort_order: 3,
      },
    ];

    for (const ach of achievements) {
      await client.query(
        'INSERT INTO achievements (title, description, sort_order) VALUES ($1, $2, $3)',
        [ach.title, ach.description, ach.sort_order]
      );
    }
    console.log('✅ Achievements seeded');

    console.log('🎉 Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seed error:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
