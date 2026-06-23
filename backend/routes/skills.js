// routes/skills.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/skills - Get all active skills
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM skills WHERE is_active = TRUE';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    query += ' ORDER BY sort_order ASC, category ASC';

    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows, count: rows.length });
  } catch (error) {
    console.error('Skills fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET /api/skills/categories - Get skills grouped by category
router.get('/categories', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM skills WHERE is_active = TRUE ORDER BY category ASC, sort_order ASC'
    );

    // Group by category
    const grouped = rows.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {});

    res.json({ success: true, data: grouped });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// POST /api/skills - Add a new skill
router.post('/', async (req, res) => {
  const { name, category, proficiency, icon, color, sort_order } = req.body;
  if (!name || !category) {
    return res.status(400).json({ success: false, message: 'Name and category are required' });
  }
  try {
    const [result] = await db.query(
      'INSERT INTO skills (name, category, proficiency, icon, color, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, proficiency || 80, icon, color, sort_order || 0]
    );
    res.status(201).json({ success: true, message: 'Skill added', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
