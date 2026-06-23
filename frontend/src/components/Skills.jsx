import { useState } from 'react';
import '../styles/Components.css';

const CATEGORIES = ['all', 'frontend', 'backend', 'database', 'tools'];

export default function Skills({ skills }) {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? skills : skills.filter(s => s.category === active);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">My Expertise</div>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">Technologies I work with to build robust, scalable applications</p>
        </div>
        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button key={cat} className={`tab-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
        <div className="skills-grid">
          {filtered.map((skill, i) => (
            <div key={skill.id} className="glass skill-card fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="skill-header">
                <div className="skill-info">
                  <div className="skill-icon">
                    <i className={skill.icon} style={{ color: skill.color }} />
                  </div>
                  <div className="skill-name">{skill.name}</div>
                </div>
                <div className="skill-percent">{skill.proficiency}%</div>
              </div>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: `${skill.proficiency}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
