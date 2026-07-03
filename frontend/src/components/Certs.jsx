// src/components/Certs.jsx
import React from 'react';
import '../styles/Components.css';

export default function Certs({ education = [], experience = [], profile = {} }) {
  const isSulthan = profile?.name?.toUpperCase().includes('SULTHAN');
  // Format experience as Industry Experience (01, 02)
  // Format education/certifications as Certifications & Workshops (03, 04, 05, etc.)
  
  return (
    <section id="certs" className="certs-section">
      {/* Decorative vertical coordinates */}
      <div className="certs-vertical-coordinates">
        12.4919° N · 78.5677° E
      </div>
      
      <div className="container">
        {/* Section Header */}
        <div className="certs-header">
          <span className="certs-tag">VERIFIED CREDENTIALS</span>
          <div className="certs-header-row">
            <h2 className="certs-title">
              Certifications<br />& Training
            </h2>
            <p className="certs-subtitle">
              Industry internships, academic credentials, and hands-on professional workshops.
            </p>
          </div>
        </div>

        {/* 1. Industry Experience Grid */}
        <div className="certs-group">
          <span className="certs-group-label">INDUSTRY EXPERIENCE</span>
          <div className="certs-grid-internships">
            {experience.map((exp, index) => {
              const numStr = String(index + 1).padStart(2, '0');
              const techTags = exp.technologies 
                ? exp.technologies.split(',').map(tech => tech.trim()) 
                : [];

              return (
                <div key={exp.id || index} className="cert-card-premium">
                  <div className="cert-number">{numStr}</div>
                  <span className="cert-badge-type">
                    {exp.position?.toUpperCase().includes('INTERN') ? 'INTERNSHIP' : 'EXPERIENCE'}
                  </span>
                  <h3 className="cert-card-title">{exp.position}</h3>
                  <div className="cert-card-company">
                    {exp.company} <span className="dim">· {exp.location}</span>
                  </div>
                  <p className="cert-card-desc">
                    {exp.description}
                  </p>
                  {techTags.length > 0 && (
                    <div className="cert-card-tags">
                      {techTags.map(tech => (
                        <span key={tech} className="cert-tag-pill">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Certifications & Workshops Grid */}
        <div className="certs-group">
          <span className="certs-group-label">ACADEMIC & PROFESSIONAL DEGREES</span>
          <div className="certs-grid-academic">
            {education.map((edu, index) => {
              // start number after internships
              const numStr = String(experience.length + index + 1).padStart(2, '0');
              return (
                <div key={edu.id || index} className="cert-card-academic">
                  <div className="cert-number-dim">{numStr}</div>
                  <span className="cert-badge-academic">
                    {edu.grade?.toUpperCase() || 'EDUCATION'}
                  </span>
                  <div className="cert-academic-year">
                    {edu.start_year} - {edu.end_year}
                  </div>
                  <h4 className="cert-academic-title">{edu.degree}</h4>
                  <p className="cert-academic-institution">
                    {edu.institution} <span className="dim">· {edu.location}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Current Lab Focus Section */}
        <div className="lab-focus-box">
          <h3 className="lab-focus-title">Current Lab Focus</h3>
          <div className="lab-focus-list">
            {(isSulthan ? [
              { status: '> [Building]', text: 'Chronic Kidney Disease App V2 & Structural Automation Frameworks' },
              { status: '> [Exploring]', text: 'Retrieval-Augmented Generation (RAG) & Vector Database Architectures' }
            ] : [
              { status: '> [Learning]', text: 'Advanced Full-Stack Workflows, Hybrid Mobile App Security, & performance tuning.' },
              { status: '> [Projects]', text: 'Refining secure API integrations, Razorpay checkout implementations, and multi-tenant database designs.' },
              { status: '> [Research]', text: 'PG Diploma research in Cyber Security and vulnerability assessment for web platforms.' }
            ]).map((item, idx) => (
              <div key={idx} className="lab-focus-item">
                <span className="lab-focus-status">{item.status}</span>
                <p className="lab-focus-text">{item.text}</p>
              </div>
            ))}
            {isSulthan && (
              <div style={{ marginTop: '1rem', display: 'flex' }}>
                <span className="w-3 h-5 bg-accent animate-pulse" style={{ display: 'inline-block', width: '12px', height: '20px', backgroundColor: 'var(--primary)' }} />
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
