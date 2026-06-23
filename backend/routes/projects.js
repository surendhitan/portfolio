// routes/projects.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/projects - Get all active projects
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = 'SELECT * FROM projects WHERE is_active = TRUE';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (featured === 'true') {
      query += ' AND is_featured = TRUE';
    }
    query += ' ORDER BY sort_order ASC, created_at DESC';

    const [rows] = await db.query(query, params);

    // Convert tech_stack string to array
    const projects = rows.map(p => ({
      ...p,
      tech_stack: p.tech_stack ? p.tech_stack.split(',').map(t => t.trim()) : []
    }));

    res.json({ success: true, data: projects, count: projects.length });
  } catch (error) {
    console.error('Projects fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM projects WHERE id = ? AND is_active = TRUE', [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    const project = {
      ...rows[0],
      tech_stack: rows[0].tech_stack ? rows[0].tech_stack.split(',').map(t => t.trim()) : []
    };
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST /api/projects - Add new project
router.post('/', async (req, res) => {
  const { title, description, short_desc, tech_stack, image_url, live_url, github_url, category, is_featured, sort_order } = req.body;
  if (!title) {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }
  try {
    const techStr = Array.isArray(tech_stack) ? tech_stack.join(',') : tech_stack;
    const [result] = await db.query(
      `INSERT INTO projects (title, description, short_desc, tech_stack, image_url, live_url, github_url, category, is_featured, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, short_desc, techStr, image_url, live_url, github_url, category || 'web', is_featured || false, sort_order || 0]
    );
    res.status(201).json({ success: true, message: 'Project added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
