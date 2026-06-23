// src/api/portfolioApi.js
// Centralized API calls to backend
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Fallback static data when backend is offline
const FALLBACK_DATA = {
  profile: {
    name: 'SURENDHIRAN A',
    title: 'Full Stack Developer (Mobile Application)',
    subtitle: 'React Native • Node.js • MySQL',
    bio: 'During my internship, I gained practical experience in frontend and backend development, database management, and implementing CRUD operations. I worked closely with team members to improve application features and ensure performance and reliability. This experience enhanced my problem-solving skills and strengthened my understanding of the software development process. I am genuinely passionate about building user-focused applications and continuously improving my technical and professional skills',
    email: 'surendhiransurendhiran645@gmail.com',
    phone: '+91 78714 88475',
    location: 'Tamil Nadu, India',
    github_url: 'https://github.com/Surendhiran_645',
    linkedin_url: 'https://www.linkedin.com/in/surendhiran645/',
    twitter_url: '#',
    resume_url: '/resume.jpg',
    years_experience: 0, // Fresher
    projects_completed: 7,
  },
  skills: [
    { id: 1, name: 'PHP', category: 'backend', proficiency: 85, icon: 'fab fa-php', color: '#777BB4' },
    { id: 2, name: 'JavaScript', category: 'frontend', proficiency: 90, icon: 'fab fa-js', color: '#F7DF1E' },
    { id: 3, name: 'Python', category: 'backend', proficiency: 80, icon: 'fab fa-python', color: '#3776AB' },
    { id: 4, name: 'React Native', category: 'frontend', proficiency: 85, icon: 'fab fa-react', color: '#61DAFB' },
    { id: 5, name: '.Net', category: 'backend', proficiency: 75, icon: 'fas fa-code', color: '#512BD4' },
    { id: 6, name: 'Node.js', category: 'backend', proficiency: 85, icon: 'fab fa-node-js', color: '#339933' },
    { id: 7, name: 'MySQL', category: 'database', proficiency: 88, icon: 'fas fa-database', color: '#4479A1' },
    { id: 8, name: 'Cloud Services', category: 'tools', proficiency: 80, icon: 'fas fa-cloud', color: '#4285F4' },
  ],
  projects: [
    { id: 1, title: 'E-Commerce Platform', short_desc: 'Full-stack e-commerce with payment integration', tech_stack: ['React', 'Node.js', 'MySQL', 'Stripe'], category: 'fullstack', is_featured: true, github_url: '#', live_url: '#' },
    { id: 2, title: 'Portfolio Website', short_desc: 'React + Node.js portfolio with MySQL backend', tech_stack: ['React', 'Node.js', 'MySQL', 'CSS3'], category: 'fullstack', is_featured: true, github_url: '#', live_url: '#' },
    { id: 3, title: 'Task Management App', short_desc: 'React Native task manager with real-time sync', tech_stack: ['React Native', 'Node.js', 'MongoDB'], category: 'mobile', is_featured: true, github_url: '#', live_url: '#' },
    { id: 4, title: 'REST API Service', short_desc: 'Secure REST API with JWT & RBAC', tech_stack: ['Node.js', 'Express', 'MySQL', 'JWT'], category: 'api', is_featured: false, github_url: '#', live_url: '#' },
    { id: 5, title: 'Data Dashboard', short_desc: 'Real-time analytics dashboard', tech_stack: ['React', 'Chart.js', 'Node.js', 'MySQL'], category: 'web', is_featured: false, github_url: '#', live_url: '#' },
  ],
  education: [
    { id: 1, degree: 'Master of Computer Application', institution: 'Sacred Heart College,TPT', location: 'Thiruvalluvar University', start_year: 2024, end_year: 2026, grade: 'Postgraduate' },
    { id: 2, degree: 'PG Diploma in Cyber Security', institution: 'Sacred Heart College,TPT', location: 'Thiruvalluvar University', start_year: 2025, end_year: 2026, grade: 'PG Diploma' },
    { id: 3, degree: 'Bachelor of Science in Computer Science', institution: 'Islamiah College,VNB', location: 'Thiruvalluvar University', start_year: 2021, end_year: 2024, grade: 'Undergraduate' },
  ],
  experience: [
    { id: 1, position: 'Full Stack Development Intern', company: 'Tecxy IT park', location: 'Tirupattur', start_date: '2025-01-01', end_date: '2026-01-01', is_current: false, description: 'Developed SmartPay, a full-stack mobile payment application at Tecxy IT Park, Tirupattur, using React Native, Node.js, and MySQL, integrating Razorpay for secure transactions, authentication, API integration, and efficient database design.', technologies: 'React Native,Node.js,MySQL,Razorpay' },
    { id: 2, position: 'Full Stack Development Intern', company: 'Queenbug Technologies', location: 'Tirupattur', start_date: '2024-01-01', end_date: '2025-01-01', is_current: false, description: 'Worked on full stack web development using PHP, MySQL, and cloud services, developing responsive interfaces, managing databases, and ensuring application performance, scalability, and secure deployment in a team environment.', technologies: 'PHP,MySQL,Cloud Services' },
  ],
  services: [
    { id: 1, title: 'Web Development', description: 'Building modern, responsive web applications using React, Node.js, and the latest technologies.', icon: 'fas fa-globe' },
    { id: 2, title: 'Mobile App Development', description: 'Creating cross-platform mobile applications with React Native for iOS and Android.', icon: 'fas fa-mobile-alt' },
    { id: 3, title: 'API Development', description: 'Designing and building robust RESTful APIs with Node.js, Express, and MySQL.', icon: 'fas fa-code' },
    { id: 4, title: 'Database Design', description: 'Architecting efficient MySQL and MongoDB database schemas for optimal performance.', icon: 'fas fa-database' },
    { id: 5, title: 'UI/UX Design', description: 'Designing intuitive, beautiful user interfaces with a focus on user experience.', icon: 'fas fa-paint-brush' },
    { id: 6, title: 'Code Review & Consulting', description: 'Reviewing codebases, identifying bottlenecks, and providing technical consulting.', icon: 'fas fa-search-plus' },
  ],
  testimonials: [
    { id: 1, client_name: 'Rajesh Kumar', client_title: 'CEO', client_company: 'Startup Hub', message: 'Surendran delivered our e-commerce platform exactly as envisioned. The code quality and attention to detail were exceptional.', rating: 5 },
    { id: 2, client_name: 'Priya Sharma', client_title: 'Product Manager', client_company: 'Tech Corp', message: 'Outstanding work on our React Native app. The app performance is excellent and the UI is exactly what we wanted.', rating: 5 },
    { id: 3, client_name: 'Anand Ravi', client_title: 'CTO', client_company: 'Digital Ventures', message: 'Excellent backend developer. The API he built is robust, well-documented, and scales beautifully under load.', rating: 5 },
  ],
};

// Generic fetcher with fallback
async function safeFetch(endpoint, fallbackKey) {
  try {
    const res = await api.get(endpoint);
    if (res.data.success) return res.data.data;
    return FALLBACK_DATA[fallbackKey];
  } catch {
    console.warn(`Backend offline — using fallback data for "${fallbackKey}"`);
    return FALLBACK_DATA[fallbackKey];
  }
}

export const portfolioApi = {
  getAll: () => safeFetch('/all', null).then(d => d || FALLBACK_DATA),
  getProfile: () => safeFetch('/profile', 'profile'),
  getSkills: () => safeFetch('/skills', 'skills'),
  getProjects: (params) => api.get('/projects', { params }).then(r => r.data.data).catch(() => FALLBACK_DATA.projects),
  getEducation: () => safeFetch('/education', 'education'),
  getExperience: () => safeFetch('/experience', 'experience'),
  getServices: () => safeFetch('/services', 'services'),
  getTestimonials: () => safeFetch('/testimonials', 'testimonials'),
  submitContact: (data) => api.post('/contact', data).then(r => r.data),
};

export default portfolioApi;
