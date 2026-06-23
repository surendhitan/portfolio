import { useState, useEffect } from 'react';
import '../styles/Hero.css';
import useCountUp from '../hooks/useCountUp';

// ── Typewriter effect ───────────────────────────────────────
const ROLES = [
  'Full Stack Developer',
  'React Native Developer',
  'Node.js Engineer',
  'MySQL Database Expert',
  'UI/UX Enthusiast',
];

function TypeWriter() {
  const [text, setText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setSpeed(2000); // pause at end
          setIsDeleting(true);
        } else {
          setSpeed(90);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIdx((i) => (i + 1) % ROLES.length);
          setSpeed(300);
        } else {
          setSpeed(50);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIdx, speed]);

  return <span className="hero-role">{text}</span>;
}

// ── Tech stack pills ─────────────────────────────────────────
const TECH = [
  { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
  { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
  { name: 'MySQL', icon: 'fas fa-database', color: '#4479A1' },
  { name: 'JavaScript', icon: 'fab fa-js', color: '#F7DF1E' },
  { name: 'React Native', icon: 'fab fa-react', color: '#61DAFB' },
  { name: 'Express.js', icon: 'fas fa-server', color: '#888' },
];

// ── What I Do highlights ─────────────────────────────────────
const HIGHLIGHTS = [
  { icon: 'fas fa-globe', title: 'Web Apps', desc: 'Responsive, fast React applications with clean UX' },
  { icon: 'fas fa-mobile-alt', title: 'Mobile Apps', desc: 'Cross-platform React Native apps for iOS & Android' },
  { icon: 'fas fa-server', title: 'Backend APIs', desc: 'Robust Node.js REST APIs with MySQL & Express' },
  { icon: 'fas fa-shield-alt', title: 'Secure & Scalable', desc: 'JWT auth, RBAC, rate limiting & production-ready code' },
];

// ── Stat counter ─────────────────────────────────────────────
function StatCounter({ value, label }) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div className="stat" ref={ref}>
      <div className="stat-value">{count}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────
export default function Hero({ profile }) {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="hero">
      {/* Backgrounds */}
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="container hero-content">
        {/* ── Main grid ── */}
        <div className="hero-layout">
          {/* Left */}
          <div className="hero-left">
            {/* Available badge */}
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Open to work · Available now
            </div>

            {/* Name */}
            <h1 className="hero-title">
              <span className="hero-greeting">Hi there, I'm </span>
              <br />
              <span className="hero-name">{profile?.name || 'Surendran S'}</span>
            </h1>

            {/* Typewriter role */}
            <div className="hero-role-wrap">
              <span className="hero-role-prefix">I'm a</span>
              <TypeWriter />
            </div>

            {/* Bio */}
            <p className="hero-desc">
              {profile?.bio || 'Passionate Full Stack Developer building modern web & mobile apps with React, Node.js, and MySQL.'}
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
                <i className="fas fa-rocket" /> View My Work
              </button>
              <button className="btn btn-outline" onClick={() => scrollTo('#contact')}>
                <i className="fas fa-paper-plane" /> Hire Me
              </button>
              <a
                href={profile?.resume_url || '#'}
                className="btn btn-outline"
                download
              >
                <i className="fas fa-download" /> Resume
              </a>
            </div>

            {/* Tech pills */}
            <div className="hero-tech-stack">
              <span className="hero-tech-label">Stack:</span>
              {TECH.map(t => (
                <span key={t.name} className="hero-tech-pill">
                  <i className={t.icon} style={{ color: t.color }} />
                  {t.name}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {profile?.years_experience && profile.years_experience > 0 ? (
                <StatCounter value={profile.years_experience} label="Years Exp." />
              ) : (
                <div className="stat">
                  <div className="stat-value">Fresher</div>
                  <div className="stat-label">Experience</div>
                </div>
              )}
              <StatCounter value={profile?.projects_completed || 7} label="Projects Done" />
            </div>
          </div>

          {/* Right — Avatar */}
          <div className="hero-visual">
            <div className="avatar-container">
              {/* Orbit ring */}
              <div className="orbit-ring">
                <div className="orbit-icon"><i className="fab fa-react" style={{ color: '#61DAFB' }} /></div>
                <div className="orbit-icon"><i className="fab fa-node-js" style={{ color: '#339933' }} /></div>
                <div className="orbit-icon"><i className="fas fa-database" style={{ color: '#4479A1' }} /></div>
                <div className="orbit-icon"><i className="fab fa-js" style={{ color: '#F7DF1E' }} /></div>
              </div>

              {/* Avatar */}
              <div className="avatar-ring">
                <div className="avatar-inner">🧑‍💻</div>
              </div>

              {/* Floating badges */}
              <div className="float-badge top">
                <span className="badge-dot green" />
                React Native Dev
              </div>
              <div className="float-badge bottom">
                <span className="badge-dot blue" />
                MySQL Expert
              </div>
              <div className="float-badge right">
                <span className="badge-dot yellow" />
                Node.js API
              </div>
            </div>
          </div>
        </div>

        {/* ── Highlights strip ── */}
        <div className="hero-highlights">
          {HIGHLIGHTS.map(h => (
            <div key={h.title} className="highlight-card">
              <div className="highlight-icon">
                <i className={h.icon} />
              </div>
              <div className="highlight-title">{h.title}</div>
              <div className="highlight-desc">{h.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" onClick={() => scrollTo('#about')}>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
