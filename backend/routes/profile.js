// routes/profile.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/profile - Get portfolio owner profile
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM profile LIMIT 1');
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// PUT /api/profile/:id - Update profile
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    name, title, subtitle, bio, email, phone, location,
    github_url, linkedin_url, twitter_url, resume_url,
    years_experience, projects_completed, happy_clients
  } = req.body;

  try {
    await db.query(
      `UPDATE profile SET name=?, title=?, subtitle=?, bio=?, email=?, phone=?, location=?,
       github_url=?, linkedin_url=?, twitter_url=?, resume_url=?,
       years_experience=?, projects_completed=?, happy_clients=? WHERE id=?`,
      [name, title, subtitle, bio, email, phone, location,
       github_url, linkedin_url, twitter_url, resume_url,
       years_experience, projects_completed, happy_clients, id]
    );
    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
