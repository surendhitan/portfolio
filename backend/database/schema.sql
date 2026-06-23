-- ============================================
--  PORTFOLIO DATABASE SCHEMA
--  MySQL Setup Script
-- ============================================

-- Create and use the database
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

-- Drop existing tables to prevent duplicate entries on database reset
DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS experience;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS contacts;


-- ============================================
-- TABLE: profile
-- Stores main portfolio owner info
-- ============================================
CREATE TABLE IF NOT EXISTS profile (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(150) NOT NULL,
  subtitle VARCHAR(255),
  bio TEXT,
  email VARCHAR(100),
  phone VARCHAR(20),
  location VARCHAR(100),
  github_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  twitter_url VARCHAR(255),
  resume_url VARCHAR(255),
  profile_image VARCHAR(255),
  years_experience INT DEFAULT 0,
  projects_completed INT DEFAULT 0,
  happy_clients INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: skills
-- Stores technical skills with proficiency
-- ============================================
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category ENUM('frontend', 'backend', 'database', 'tools', 'other') NOT NULL DEFAULT 'other',
  proficiency INT NOT NULL DEFAULT 80 COMMENT 'Percentage 0-100',
  icon VARCHAR(100),
  color VARCHAR(20),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: projects
-- Stores portfolio projects
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  short_desc VARCHAR(300),
  tech_stack VARCHAR(500) COMMENT 'Comma-separated technology names',
  image_url VARCHAR(255),
  live_url VARCHAR(255),
  github_url VARCHAR(255),
  category ENUM('web', 'mobile', 'api', 'fullstack', 'other') DEFAULT 'web',
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: education
-- Stores education history
-- ============================================
CREATE TABLE IF NOT EXISTS education (
  id INT AUTO_INCREMENT PRIMARY KEY,
  degree VARCHAR(200) NOT NULL,
  institution VARCHAR(200) NOT NULL,
  location VARCHAR(100),
  start_year YEAR,
  end_year YEAR,
  grade VARCHAR(50),
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: experience
-- Stores work experience
-- ============================================
CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  position VARCHAR(200) NOT NULL,
  company VARCHAR(200) NOT NULL,
  location VARCHAR(100),
  start_date DATE,
  end_date DATE NULL COMMENT 'NULL means current job',
  is_current BOOLEAN DEFAULT FALSE,
  description TEXT,
  technologies VARCHAR(500),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: services
-- Stores services offered
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: testimonials
-- Stores client testimonials
-- ============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  client_title VARCHAR(150),
  client_company VARCHAR(150),
  client_image VARCHAR(255),
  message TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE: contacts
-- Stores contact form submissions
-- ============================================
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied') DEFAULT 'new',
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- SEED DATA: Default portfolio content
-- ============================================

-- Profile
INSERT INTO profile (name, title, subtitle, bio, email, phone, location, github_url, linkedin_url, twitter_url, resume_url, years_experience, projects_completed, happy_clients)
VALUES (
  'SURENDHIRAN A',
  'Full Stack Developer (Mobile Application)',
  'React Native • Node.js • MySQL',
  'During my internship, I gained practical experience in frontend and backend development, database management, and implementing CRUD operations. I worked closely with team members to improve application features and ensure performance and reliability. This experience enhanced my problem-solving skills and strengthened my understanding of the software development process. I am genuinely passionate about building user-focused applications and continuously improving my technical and professional skills',
  'surendhiransurendhiran645@gmail.com',
  '+91 78714 88475',
  'Tamil Nadu, India',
  'https://github.com/Surendhiran_645',
  'https://www.linkedin.com/in/surendhiran645/',
  '#',
  '/uploads/resume.jpg',
  0,
  7,
  NULL
);

-- Skills
INSERT INTO skills (name, category, proficiency, icon, color, sort_order) VALUES
('PHP', 'backend', 85, 'fab fa-php', '#777BB4', 1),
('JavaScript', 'frontend', 90, 'fab fa-js', '#F7DF1E', 2),
('Python', 'backend', 80, 'fab fa-python', '#3776AB', 3),
('React Native', 'frontend', 85, 'fab fa-react', '#61DAFB', 4),
('.Net', 'backend', 75, 'fas fa-code', '#512BD4', 5),
('Node.js', 'backend', 85, 'fab fa-node-js', '#339933', 6),
('MySQL', 'database', 88, 'fas fa-database', '#4479A1', 7),
('Cloud Services', 'tools', 80, 'fas fa-cloud', '#4285F4', 8);

-- Projects
INSERT INTO projects (title, description, short_desc, tech_stack, category, is_featured, sort_order) VALUES
('E-Commerce Platform', 'A full-stack e-commerce application with product management, shopping cart, payment integration, and admin dashboard. Features real-time inventory tracking and order management.', 'Full-stack e-commerce with payment integration', 'React,Node.js,Express,MySQL,Stripe', 'fullstack', TRUE, 1),
('Portfolio Website', 'A modern responsive portfolio website with React frontend and Node.js backend. Features dynamic content management, contact form, and MySQL database integration.', 'React + Node.js portfolio with MySQL backend', 'React,Node.js,MySQL,CSS3', 'fullstack', TRUE, 2),
('Task Management App', 'A collaborative task management application with real-time updates, team collaboration features, file uploads, and push notifications using React Native.', 'React Native task manager with real-time sync', 'React Native,Node.js,MongoDB,Socket.io', 'mobile', TRUE, 3),
('REST API Service', 'A comprehensive RESTful API service with JWT authentication, role-based access control, rate limiting, and full documentation.', 'Secure REST API with JWT & RBAC', 'Node.js,Express,MySQL,JWT', 'api', FALSE, 4),
('Data Dashboard', 'An interactive analytics dashboard with real-time charts, data filtering, CSV export, and responsive design.', 'Real-time analytics dashboard', 'React,Chart.js,Node.js,MySQL', 'web', FALSE, 5);

-- Education
INSERT INTO education (degree, institution, location, start_year, end_year, grade, sort_order) VALUES
('Master of Computer Application', 'Sacred Heart College,TPT', 'Thiruvalluvar University', 2024, 2026, 'Postgraduate', 1),
('PG Diploma in Cyber Security', 'Sacred Heart College,TPT', 'Thiruvalluvar University', 2025, 2026, 'PG Diploma', 2),
('Bachelor of Science in Computer Science', 'Islamiah College,VNB', 'Thiruvalluvar University', 2021, 2024, 'Undergraduate', 3);

-- Experience
INSERT INTO experience (position, company, location, start_date, end_date, is_current, description, technologies, sort_order) VALUES
('Full Stack Development Intern', 'Tecxy IT park', 'Tirupattur', '2025-01-01', '2026-01-01', FALSE, 'Developed SmartPay, a full-stack mobile payment application at Tecxy IT Park, Tirupattur, using React Native, Node.js, and MySQL, integrating Razorpay for secure transactions, authentication, API integration, and efficient database design.', 'React Native,Node.js,MySQL,Razorpay', 1),
('Full Stack Development Intern', 'Queenbug Technologies', 'Tirupattur', '2024-01-01', '2025-01-01', FALSE, 'Worked on full stack web development using PHP, MySQL, and cloud services, developing responsive interfaces, managing databases, and ensuring application performance, scalability, and secure deployment in a team environment.', 'PHP,MySQL,Cloud Services', 2);

-- Services
INSERT INTO services (title, description, icon, sort_order) VALUES
('Web Development', 'Building modern, responsive web applications using React, Node.js, and the latest technologies.', 'fas fa-globe', 1),
('Mobile App Development', 'Creating cross-platform mobile applications with React Native for iOS and Android.', 'fas fa-mobile-alt', 2),
('API Development', 'Designing and building robust RESTful APIs with Node.js, Express, and MySQL.', 'fas fa-code', 3),
('Database Design', 'Architecting efficient MySQL and MongoDB database schemas for optimal performance.', 'fas fa-database', 4),
('UI/UX Design', 'Designing intuitive, beautiful user interfaces with a focus on user experience.', 'fas fa-paint-brush', 5),
('Code Review & Consulting', 'Reviewing codebases, identifying bottlenecks, and providing technical consulting.', 'fas fa-search-plus', 6);

-- Testimonials
INSERT INTO testimonials (client_name, client_title, client_company, message, rating) VALUES
('Rajesh Kumar', 'CEO', 'Startup Hub', 'Surendran delivered our e-commerce platform exactly as envisioned. The code quality and attention to detail were exceptional. Highly recommended!', 5),
('Priya Sharma', 'Product Manager', 'Tech Corp', 'Outstanding work on our React Native app. The app performance is excellent and the UI is exactly what we wanted.', 5),
('Anand Ravi', 'CTO', 'Digital Ventures', 'Excellent backend developer. The API he built is robust, well-documented, and scales beautifully under load.', 5);
