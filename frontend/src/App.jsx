import { useState, useEffect, useRef } from 'react';
import portfolioApi from './api/portfolioApi';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import './index.css';

// ─── Cursor Glow ────────────────────────────────────────────
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      if (el) { el.style.left = e.clientX + 'px'; el.style.top = e.clientY + 'px'; }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div className="cursor-glow" ref={ref} />;
}

// ─── Back to Top ────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      id="back-to-top"
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
    >
      <i className="fas fa-arrow-up" />
    </button>
  );
}

// ─── Footer ─────────────────────────────────────────────────
function Footer({ profile }) {
  const socials = [
    { href: profile?.github_url, icon: 'fab fa-github', label: 'GitHub' },
    { href: profile?.linkedin_url, icon: 'fab fa-linkedin', label: 'LinkedIn' },
    { href: profile?.twitter_url, icon: 'fab fa-twitter', label: 'Twitter' },
  ].filter(s => s.href && s.href !== '#');

  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">{profile?.name?.split(' ')[0] || 'Portfolio'}</div>
            <p className="footer-tagline">{profile?.title || 'Full Stack Developer'}</p>
            <div className="footer-socials">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="social-link" title={s.label}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul>
              {['#home', '#about', '#skills', '#projects', '#services', '#contact'].map(href => (
                <li key={href}>
                  <a href={href} onClick={e => { e.preventDefault(); scrollTo(href); }}>
                    {href.slice(1).charAt(0).toUpperCase() + href.slice(2)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="footer-links">
            <h4 className="footer-heading">Tech Stack</h4>
            <ul>
              {['React', 'React Native', 'Node.js', 'Express.js', 'MySQL', 'JavaScript'].map(t => (
                <li key={t}><span className="footer-tech">{t}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-links">
            <h4 className="footer-heading">Contact</h4>
            <ul>
              <li><i className="fas fa-envelope" style={{ marginRight: 8, color: 'var(--primary-light)' }} />{profile?.email}</li>
              <li><i className="fas fa-phone" style={{ marginRight: 8, color: 'var(--primary-light)' }} />{profile?.phone}</li>
              <li><i className="fas fa-map-marker-alt" style={{ marginRight: 8, color: 'var(--primary-light)' }} />{profile?.location}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} <strong style={{ color: 'var(--primary-light)' }}>{profile?.name || 'Surendran S'}</strong>. All rights reserved.</p>
          <p>Built with <span style={{ color: 'var(--secondary)' }}>♥</span> using React + Node.js + MySQL</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Loader ─────────────────────────────────────────────────
function Loader() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <div className="spinner" style={{ width: 60, height: 60 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
          🧑‍💻
        </div>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Loading Portfolio...</p>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    portfolioApi.getAll()
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const {
    profile = {}, skills = [], projects = [], education = [],
    experience = [], services = [], testimonials = []
  } = data || {};

  return (
    <>
      <CursorGlow />
      <Navbar profile={profile} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Resume profile={profile} education={education} experience={experience} />
        <Projects projects={projects} />
        <Services services={services} />
        <Testimonials testimonials={testimonials} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
      <BackToTop />
    </>
  );
}
