// src/components/Hero.jsx
import React from 'react';
import '../styles/Hero.css';

export default function Hero({ profile }) {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, null, href);
  };

  // Determine split name for the headline
  let firstLine = 'SURENDHIRAN';
  let secondLine = 'A';
  if (profile?.name) {
    const upperName = profile.name.toUpperCase();
    if (upperName.includes('MOHAMMED SULTHAN')) {
      firstLine = 'SULTHAN';
      secondLine = 'AKTHAR S';
    } else {
      const parts = upperName.split(' ');
      if (parts.length > 1) {
        firstLine = parts.slice(0, -1).join(' ');
        secondLine = parts[parts.length - 1];
      } else {
        firstLine = upperName;
        secondLine = '';
      }
    }
  }

  // Determine subheadings / capsules from profile subtitle (comma separated)
  const subtitleTags = profile?.subtitle
    ? profile.subtitle.split(',').map(s => s.trim().toUpperCase())
    : ['MCA GRADUATE', 'FULL STACK DEVELOPER', 'MOBILE APP DEVELOPER'];

  const metaId = profile?.name?.toUpperCase().includes('SULTHAN') ? 'ID — MSA.2026' : 'ID — SA.2026';

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        
        {/* Left Side: Info */}
        <div className="hero-info">
          <div className="hero-header-label">
            <span className="label-text">PROFILE — 01</span>
            <div className="label-line" />
          </div>

          <div className="hero-capsules">
            {subtitleTags.map((tag, idx) => (
              <span key={idx} className="hero-capsule">{tag}</span>
            ))}
          </div>

          <h1 className="hero-headline">
            {firstLine}<br />
            {secondLine && <span className="hero-headline-accent">{secondLine}</span>}
          </h1>

          <p className="hero-bio">
            {profile?.bio || 'MCA candidate and Cyber Security diploma graduate specialising in mobile app development, secure RESTful APIs, and full-stack development. Turning complex databases and interface requirements into functional mobile and web software.'}
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
              <i className="fas fa-network-wired" /> View Systems
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo('#contact')}>
              <i className="fas fa-bolt" /> Initialize Contact
            </button>
          </div>
        </div>

        {/* Right Side: Visual Bracket Frame */}
        <div className="hero-photo-frame-wrap">
          {/* Cyan Bracket Frame */}
          <div className="photo-bracket-frame">
            {/* Corner brackets */}
            <div className="bracket bracket-tl" />
            <div className="bracket bracket-tr" />
            <div className="bracket bracket-bl" />
            <div className="bracket bracket-br" />

            {/* Active status pill */}
            <div className="photo-status-pill">
              <span className="status-dot" />
              ACTIVE
            </div>

            {/* Main Image content */}
            <div className="photo-content-area">
              <div className="photo-graphic-placeholder">
                <i className="fas fa-terminal photo-placeholder-icon" />
              </div>
              
              {/* Bottom card details */}
              <div className="photo-meta-card">
                <div className="meta-id">{metaId}</div>
                <div className="meta-name">{profile?.name || 'Surendhiran A'}</div>
                <div className="meta-title">{profile?.title || 'Full Stack Developer · MCA'}</div>
              </div>
            </div>
          </div>

          {/* Vertical Coordinate Label */}
          <div className="vertical-coordinates">
            12.4919° N · 78.5677° E
          </div>
        </div>

      </div>
    </section>
  );
}
