// routes/portfolio.js
// Combined route for education, experience, services, testimonials
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/education
router.get('/education', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM education ORDER BY sort_order ASC, start_year DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET /api/experience
router.get('/experience', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM experience ORDER BY sort_order ASC, start_date DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET /api/services
router.get('/services', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM services WHERE is_active = TRUE ORDER BY sort_order ASC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET /api/testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM testimonials WHERE is_active = TRUE ORDER BY created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// GET /api/portfolio/all - Get everything in one request (for frontend optimization)
router.get('/all', async (req, res) => {
  try {
    const [profile] = await db.query('SELECT * FROM profile LIMIT 1');
    const [skills] = await db.query('SELECT * FROM skills WHERE is_active=TRUE ORDER BY sort_order');
    const [projects] = await db.query('SELECT * FROM projects WHERE is_active=TRUE ORDER BY sort_order');
    const [education] = await db.query('SELECT * FROM education ORDER BY sort_order');
    const [experience] = await db.query('SELECT * FROM experience ORDER BY sort_order');
    const [services] = await db.query('SELECT * FROM services WHERE is_active=TRUE ORDER BY sort_order');
    const [testimonials] = await db.query('SELECT * FROM testimonials WHERE is_active=TRUE');

    res.json({
      success: true,
      data: {
        profile: profile[0] || {},
        skills,
        projects: projects.map(p => ({
          ...p,
          tech_stack: p.tech_stack ? p.tech_stack.split(',').map(t => t.trim()) : []
        })),
        education,
        experience,
        services,
        testimonials,
      }
    });
  } catch (error) {
    console.error('Portfolio all fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
