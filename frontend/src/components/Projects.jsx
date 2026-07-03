// src/components/Projects.jsx
import { useState } from 'react';
import '../styles/Components.css';

const FILTERS = ['all', 'fullstack', 'web', 'mobile', 'api'];

const CATEGORY_TAGLINES = {
  fullstack: 'FULL-STACK ENTERPRISE SYSTEM',
  web: 'WEB INTERFACE & CORE APPLICATION',
  mobile: 'HYBRID MOBILE PLATFORM',
  api: 'SECURE REST MICROSERVICE',
  other: 'UTILITY MODULE & TOOL'
};

export default function Projects({ projects = [] }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  // Helper to generate a unique gradient for the banner based on title hash
  const getBannerStyle = (title) => {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return {
      background: `linear-gradient(135deg, hsl(${hue}, 40%, 8%) 0%, hsl(${hue}, 60%, 15%) 100%)`,
      position: 'relative',
      overflow: 'hidden'
    };
  };

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">SELECTED SYSTEMS</span>
          <h2 className="section-title">Work & Projects</h2>
          <p className="section-subtitle">
            A selection of technical architectures, mobile applications, and backend systems I have engineered.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="category-tabs">
          {FILTERS.map(f => (
            <button 
              key={f} 
              className={`tab-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Systems List */}
        <div className="systems-list">
          {filtered.map((p, i) => {
            const numStr = String(i + 1).padStart(2, '0');
            const tagline = CATEGORY_TAGLINES[p.category] || CATEGORY_TAGLINES.other;
            const tags = typeof p.tech_stack === 'string' 
              ? p.tech_stack.split(',').map(t => t.trim()) 
              : (Array.isArray(p.tech_stack) ? p.tech_stack : []);

            return (
              <div 
                key={p.id || i} 
                className="system-card fade-in" 
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Visual Banner */}
                <div className="system-banner" style={getBannerStyle(p.title)}>
                  {/* Decorative grid overlay inside banner */}
                  <div className="banner-grid-overlay" />
                  <div className="banner-icon-wrapper">
                    <i className={p.category === 'mobile' ? 'fas fa-mobile-alt' : p.category === 'api' ? 'fas fa-cogs' : 'fas fa-laptop-code'} />
                  </div>
                </div>

                {/* Content Area */}
                <div className="system-details">
                  <div className="system-num">{numStr}</div>
                  <h3 className="system-title">{p.title}</h3>
                  <div className="system-tagline">{tagline}</div>
                  <p className="system-desc">{p.short_desc || p.description}</p>
                  
                  {/* Tech stack */}
                  <div className="system-tags">
                    {tags.map(t => (
                      <span key={t} className="system-tag-pill">{t}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="system-links">
                    {p.github_url && p.github_url !== '#' && (
                      <a href={p.github_url} target="_blank" rel="noreferrer" className="system-link-btn">
                        <i className="fab fa-github" /> CODE REPOSITORY
                      </a>
                    )}
                    {p.live_url && p.live_url !== '#' && (
                      <a href={p.live_url} target="_blank" rel="noreferrer" className="system-link-btn primary">
                        <i className="fas fa-external-link-alt" /> LAUNCH SYSTEM
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
