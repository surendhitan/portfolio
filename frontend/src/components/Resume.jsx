import { useState } from 'react';
import '../styles/Components.css';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Resume({ profile, education = [], experience = [] }) {
  const [showModal, setShowModal] = useState(false);
  const revealTitle = useScrollReveal();
  const revealLeft = useScrollReveal();
  const revealRight = useScrollReveal();

  const softSkills = [
    { name: 'Strong Communication Skills', icon: 'fas fa-comments' },
    { name: 'Team Collaboration', icon: 'fas fa-users' },
    { name: 'Problem-Solving Ability', icon: 'fas fa-lightbulb' },
    { name: 'Time Management', icon: 'fas fa-clock' },
    { name: 'Leadership Skills', icon: 'fas fa-crown' },
    { name: 'Adaptability', icon: 'fas fa-sync-alt' },
  ];

  const getResumeUrl = () => {
    if (!profile?.resume_url) return '/resume.jpg';
    if (profile.resume_url.startsWith('http')) return profile.resume_url;
    // Serve from backend if it is an uploaded resource
    if (profile.resume_url.startsWith('/uploads')) {
      const apiBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : '';
      return `${apiBase}${profile.resume_url}`;
    }
    return profile.resume_url;
  };

  const resumeUrl = getResumeUrl();

  return (
    <section id="resume" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div className="section-header" ref={revealTitle}>
          <div className="section-tag">Education & Experience</div>
          <h2 className="section-title">My Resume</h2>
        </div>

        <div className="resume-grid">
          {/* Left Column: Education */}
          <div className="resume-column" ref={revealLeft}>
            <div className="resume-column-header">
              <i className="fas fa-graduation-cap resume-icon" />
              <h3>Education</h3>
            </div>
            <div className="resume-timeline">
              {education.map((edu) => (
                <div key={edu.id} className="resume-item glass">
                  <span className="resume-date">{edu.start_year} - {edu.end_year}</span>
                  <h4 className="resume-title">{edu.degree}</h4>
                  <div className="resume-subtitle">{edu.institution}</div>
                  <div className="resume-location"><i className="fas fa-map-marker-alt" style={{ marginRight: 6 }} />{edu.location}</div>
                  {edu.grade && <span className="resume-grade">{edu.grade}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Work Experience */}
          <div className="resume-column" ref={revealRight}>
            <div className="resume-column-header">
              <i className="fas fa-briefcase resume-icon" />
              <h3>Work Experience</h3>
            </div>
            <div className="resume-timeline">
              {experience.map((exp) => (
                <div key={exp.id} className="resume-item glass">
                  <span className="resume-date">{exp.start_date.split('-')[0]} - {exp.end_date ? exp.end_date.split('-')[0] : 'Present'}</span>
                  <h4 className="resume-title">{exp.position}</h4>
                  <div className="resume-subtitle">{exp.company}</div>
                  <div className="resume-location"><i className="fas fa-map-marker-alt" style={{ marginRight: 6 }} />{exp.location}</div>
                  <p className="resume-desc">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills Section */}
        <div className="soft-skills-section glass">
          <div className="soft-skills-header">
            <i className="fas fa-star soft-skills-icon" />
            <h3>Soft Skills</h3>
          </div>
          <div className="soft-skills-grid">
            {softSkills.map((skill) => (
              <div key={skill.name} className="soft-skill-badge">
                <i className={`${skill.icon} soft-skill-badge-icon`} />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Actions */}
        <div className="resume-action" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => setShowModal(true)} style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
            <i className="fas fa-eye" /> View Resume Image
          </button>
          <a
            href={resumeUrl}
            className="btn btn-outline"
            download="SURENDHIRAN_A_Resume.jpg"
            style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}
          >
            <i className="fas fa-download" /> Download Resume Image
          </a>
        </div>

        {/* Lightbox Modal for Resume Image */}
        {showModal && (
          <div className="resume-modal-backdrop" onClick={() => setShowModal(false)}>
            <div className="resume-modal-content glass" onClick={(e) => e.stopPropagation()}>
              <div className="resume-modal-header">
                <h3>SURENDHIRAN A - Professional Resume</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href={resumeUrl} download="SURENDHIRAN_A_Resume.jpg" className="btn btn-primary btn-sm" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                    <i className="fas fa-download" /> Download
                  </a>
                  <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                    <i className="fas fa-times" /> Close
                  </button>
                </div>
              </div>
              <div className="resume-modal-body">
                <img src={resumeUrl} alt="SURENDHIRAN A Resume" className="resume-modal-img" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
