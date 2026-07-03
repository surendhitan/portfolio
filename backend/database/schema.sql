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
  category VARCHAR(50) NOT NULL DEFAULT 'other',
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
  'MOHAMMED SULTHAN AKTHAR S',
  'AI & App Developer · MCA',
  'AI Automation,ML Pipelines,App Development,Website Design,Data Systems,Prompt Engineering',
  'MCA candidate and Data Science graduate specialising in AI automation, machine learning pipelines, and full-stack application development. Turning complex datasets into functional software — based in Tirupattur, India.',
  'mohammedsulthan2004@gmail.com',
  '+91 99445 50063',
  'Tirupattur, India',
  'https://github.com/Sulthanakthar',
  'https://linkedin.com/in/sulthanakthar-s-b42693261',
  'https://instagram.com/mohamed_Sultan_583',
  '/uploads/resume.jpg',
  0,
  4,
  NULL
);

-- Skills
INSERT INTO skills (name, category, proficiency, icon, color, sort_order) VALUES
('Python', 'languages', 90, 'fab fa-python', '#3776AB', 1),
('R', 'languages', 80, 'fas fa-code', '#276DC3', 2),
('SQL/MySQL', 'languages', 85, 'fas fa-database', '#4479A1', 3),
('Streamlit', 'core_stack', 88, 'fas fa-desktop', '#FF4B4B', 4),
('FastAPI', 'core_stack', 85, 'fas fa-bolt', '#009688', 5),
('HTML5, CSS3', 'core_stack', 90, 'fab fa-html5', '#E34F26', 6),
('Pandas, NumPy', 'core_stack', 85, 'fas fa-chart-line', '#15045C', 7),
('Git & GitHub', 'workflow', 90, 'fab fa-github', '#181717', 8),
('VS Code', 'workflow', 95, 'fas fa-terminal', '#007ACC', 9),
('SDLC Protocols', 'workflow', 85, 'fas fa-project-diagram', '#4CAF50', 10);

-- Projects
INSERT INTO projects (title, description, short_desc, tech_stack, category, is_featured, sort_order) VALUES
('CKD Detection App', 'Built a production-ready machine learning pipeline utilizing an optimized Random Forest Classifier to solve diagnostic barriers in underserved rural clinics. Automated risk screenings, patient metric visualizations, and an integrated AI diet planner.', 'End-to-End Predictive Health Application', 'Python,Scikit-Learn,Streamlit,Pandas,NumPy,Matplotlib,Joblib', 'mobile', TRUE, 1),
('Prompt Engineering & Workflow Automation', 'Structured few-shot system prompts and task orchestration templates enforcing strict JSON/Markdown schema constraints. Automated multi-source document parsing, cutting administrative processing time by 50%.', 'LLM Orchestration & Schema Enforcement', 'Python,LLM APIs,Advanced Prompt Engineering,JSON Schema Mapping', 'api', TRUE, 2),
('Grainheart Agro', 'Enterprise-grade digital platform for a pulses and wheat wholesale dealership. Multi-tenant dealer portal with geolocated territory mappings, automated commission payouts (2–5%), inventory row-locking at checkout, cheque verification queue, and an integrated CRM lead funnel.', 'Enterprise Agricultural Dealership Ecosystem', 'Python,Django,DRF,React,MySQL,JWT Auth,Docker', 'fullstack', TRUE, 3),
('SmartSpend', 'Full-stack B2C/B2B SaaS finance application with NLP transaction parsing, voice-to-transaction, SMS bank statement parsing, linear regression forecasting, multi-tenant B2B team budgets, Django Channels WebSockets, Celery workers, MFA, GDPR compliance tooling.', 'AI-Powered Personal & Team Financial Copilot', 'Django Channels,Celery,Redis,PostgreSQL,WebSockets,Docker,NLP', 'fullstack', TRUE, 4);

-- Education
INSERT INTO education (degree, institution, location, start_year, end_year, grade, sort_order) VALUES
('Master of Computer Applications (MCA)', 'Sacred Heart College', 'Tirupattur', 2024, 2026, 'Postgraduate', 1),
('B.Sc. in Data Science', 'Islamiah College', 'Vaniyambadi (CGPA: 8.5/10)', 2021, 2024, 'Undergraduate', 2);

-- Experience
INSERT INTO experience (position, company, location, start_date, end_date, is_current, description, technologies, sort_order) VALUES
('Prompt Engineering Intern', 'Queenbug Solutions', 'Tirupattur', '2024-06-01', '2024-12-31', FALSE, 'Developed refined LLM orchestration workflows and enforced strict output formats for API consumption.', 'Python,LLM APIs,Prompt Design', 1),
('Web Development Intern', 'Qtech Solutions', 'Tirupattur', '2023-06-01', '2023-12-31', FALSE, 'Handled backend integrations and source version control while adhering to strict SDLC protocols.', 'Git,GitHub,Web Design', 2);

-- Services
INSERT INTO services (title, description, icon, sort_order) VALUES
('AI Automation & Agent Development', 'Designing and refining production-grade LLM orchestration workflows, few-shot system prompts, and task automation agents.', 'fas fa-robot', 1),
('Full-Stack Web Applications', 'Building responsive enterprise ecosystems using Python, Django, React, and relational database systems.', 'fas fa-globe', 2),
('Machine Learning Pipelines', 'Developing predictive model training, tuning, and evaluation frameworks for diagnostic and analytic solutions.', 'fas fa-chart-bar', 3),
('Workflow & Schema Mapping', 'Enforcing strict data structure validation (JSON Schema) for downstream RESTful microservices consumption.', 'fas fa-database', 4);

-- Testimonials
INSERT INTO testimonials (client_name, client_title, client_company, message, rating) VALUES
('Suresh Kumar', 'Lead Researcher', 'BioLabs Tech', 'Mohammed Sulthan built a flawless predictive screening system that our clinic uses daily. Exceptional ML engineering skills.', 5),
('Preeti R.', 'CTO', 'AgroCore India', 'Superb job on our dealership platform. The Django transaction lock and geolocation features work perfectly.', 5);
