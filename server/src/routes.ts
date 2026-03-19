import { Router, Request, Response } from 'express';
import pool from './db.js';

const router = Router();

// GET /api/about
router.get('/about', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM about LIMIT 1');
    res.json(result.rows[0] || {});
  } catch (err) {
    console.error('Error fetching about:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/skills
router.get('/skills', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM skills ORDER BY category, id');
    // Group by category
    const grouped: Record<string, typeof result.rows> = {};
    for (const skill of result.rows) {
      if (!grouped[skill.category]) grouped[skill.category] = [];
      grouped[skill.category].push(skill);
    }
    res.json(grouped);
  } catch (err) {
    console.error('Error fetching skills:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/experience
router.get('/experience', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM experience ORDER BY sort_order');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching experience:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/projects
router.get('/projects', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY sort_order');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/achievements
router.get('/achievements', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM achievements ORDER BY sort_order');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching achievements:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/contact
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required' });
      return;
    }
    await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [name, email, subject || '', message]
    );
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
