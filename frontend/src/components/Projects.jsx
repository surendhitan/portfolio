import { useState } from 'react';
import '../styles/Components.css';

const EMOJIS = { fullstack: '🌐', web: '💻', mobile: '📱', api: '⚙️', other: '🚀' };
const FILTERS = ['all', 'fullstack', 'web', 'mobile', 'api'];

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">My Work</div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">A selection of real-world projects I've built using modern technologies</p>
        </div>
        <div className="category-tabs">
          {FILTERS.map(f => (
            <button key={f} className={`tab-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {filtered.map((p, i) => (
            <div key={p.id} className="glass project-card fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="project-img">
                <span>{EMOJIS[p.category] || '🚀'}</span>
                <div className="project-img-overlay">
                  <i className="fas fa-external-link-alt" style={{ color: '#fff', fontSize: '2rem' }} />
                </div>
              </div>
              {p.is_featured && (
                <div className="project-badge">
                  <span className="project-category-badge">⭐ Featured</span>
                </div>
              )}
              <span className="project-category-badge" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
                {p.category}
              </span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.short_desc || p.description}</p>
              <div className="tech-tags">
                {(Array.isArray(p.tech_stack) ? p.tech_stack : []).map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              <div className="project-links">
                {p.github_url && p.github_url !== '#' && (
                  <a href={p.github_url} target="_blank" rel="noreferrer" className="project-link">
                    <i className="fab fa-github" /> GitHub
                  </a>
                )}
                {p.live_url && p.live_url !== '#' && (
                  <a href={p.live_url} target="_blank" rel="noreferrer" className="project-link primary">
                    <i className="fas fa-external-link-alt" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
