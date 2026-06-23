// server.js — Portfolio Backend Main Entry Point
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const profileRoutes = require('./routes/profile');
const skillsRoutes = require('./routes/skills');
const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const portfolioRoutes = require('./routes/portfolio');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// MIDDLEWARE
// ============================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// CORS — allow frontend origin
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:5173', // Vite default
    'http://localhost:3000',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting — prevent spam/abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Stricter rate limit on contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { success: false, message: 'Too many contact submissions. Please wait an hour.' },
});
app.use('/api/contact', contactLimiter);

// Serve static uploads (e.g. resume image, profile photos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================
// API ROUTES
// ============================================
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api', portfolioRoutes);   // education, experience, services, testimonials, all

// ============================================
// HEALTH CHECK
// ============================================
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// API root info
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Portfolio API Server',
    version: '1.0.0',
    endpoints: {
      profile: 'GET /api/profile',
      skills: 'GET /api/skills',
      projects: 'GET /api/projects',
      education: 'GET /api/education',
      experience: 'GET /api/experience',
      services: 'GET /api/services',
      testimonials: 'GET /api/testimonials',
      all: 'GET /api/all',
      contact: 'POST /api/contact',
      health: 'GET /api/health',
    }
  });
});

// ============================================
// SERVE REACT BUILD IN PRODUCTION
// ============================================
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(distPath));
  // SPA catch-all — return index.html for any non-API route
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  console.log('  📦 Serving React build from:', distPath);
}

// ============================================
// 404 HANDLER (API only in dev)
// ============================================
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ============================================
// GLOBAL ERROR HANDLER
// ============================================
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  const isProd = process.env.NODE_ENV === 'production';
  console.log('\n========================================');
  console.log('  🚀 Portfolio Server Started!');
  console.log('========================================');
  if (isProd) {
    console.log(`  ✅ App:    http://localhost:${PORT}`);
  } else {
    console.log(`  ✅ API:    http://localhost:${PORT}/api`);
    console.log(`  ✅ Frontend runs separately on :3000`);
  }
  console.log(`  ✅ Health: http://localhost:${PORT}/api/health`);
  console.log(`  ✅ Mode:   ${process.env.NODE_ENV || 'development'}`);
  console.log('========================================\n');
});

module.exports = app;
