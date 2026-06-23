// routes/contact.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { body, validationResult } = require('express-validator');

// Validation rules
const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ min: 10, max: 2000 }),
  body('subject').optional().trim().isLength({ max: 200 }),
];

// POST /api/contact - Submit contact form
router.post('/', contactValidation, async (req, res) => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, subject, message } = req.body;
  const ip_address = req.ip || req.connection.remoteAddress;

  try {
    const [result] = await db.query(
      'INSERT INTO contacts (name, email, subject, message, ip_address) VALUES (?, ?, ?, ?, ?)',
      [name, email, subject || 'General Inquiry', message, ip_address]
    );

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I will get back to you soon.',
      id: result.insertId,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// GET /api/contact - Get all contact submissions (admin use)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM contacts';
    const params = [];
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    query += ' ORDER BY created_at DESC';
    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows, count: rows.length });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// PATCH /api/contact/:id/status - Update contact status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!['new', 'read', 'replied'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status value' });
  }
  try {
    await db.query('UPDATE contacts SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

module.exports = router;
