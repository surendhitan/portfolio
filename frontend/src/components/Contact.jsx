// src/components/Contact.jsx
import { useState } from 'react';
import portfolioApi from '../api/portfolioApi';
import '../styles/Components.css';

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await portfolioApi.submitContact(form);
      if (res.success) {
        setStatus('success');
        setMsg(res.message || 'Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(res.message || 'Failed to submit contact');
      }
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.message || 'Submission failed. Please check backend connection.');
    }
    setTimeout(() => setStatus(null), 5000);
  };

  const rawPhone = profile?.phone ? profile.phone.replace(/\s+/g, '').replace(/-/g, '') : '';

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">COMMUNICATION</span>
          <h2 className="section-title">Start Conversation</h2>
          <p className="section-subtitle">
            Initiate a message or connect directly through official channels.
          </p>
        </div>

        <div className="contact-split-layout">
          
          {/* Left Column: Direct Links */}
          <div className="contact-links-grid">
            
            {/* Email Card */}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="contact-link-card">
                <span className="card-label">EMAIL</span>
                <span className="card-value">{profile.email}</span>
              </a>
            )}

            {/* Phone Card */}
            {profile?.phone && (
              <a href={`https://wa.me/${rawPhone.replace('+', '')}`} target="_blank" rel="noreferrer" className="contact-link-card">
                <span className="card-label">PHONE</span>
                <span className="card-value">{profile.phone}</span>
              </a>
            )}

            {/* LinkedIn Card */}
            {profile?.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="contact-link-card">
                <span className="card-label">LINK</span>
                <span className="card-value">linkedin.com/in/{profile.linkedin_url.replace(/\/$/, '').split('/').pop()}</span>
              </a>
            )}

            {/* GitHub Card */}
            {profile?.github_url && (
              <a href={profile.github_url} target="_blank" rel="noreferrer" className="contact-link-card">
                <span className="card-label">CODE</span>
                <span className="card-value">github.com/{profile.github_url.split('/').pop()}</span>
              </a>
            )}

          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-wrapper">
            <form className="cyber-contact-form" onSubmit={handleSubmit}>
              
              {status && status !== 'loading' && (
                <div className={`form-status ${status}`}>
                  <i className={status === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'} />
                  {msg}
                </div>
              )}

              <div className="form-group">
                <textarea 
                  id="contact-message" 
                  className="form-textarea-minimal" 
                  name="message" 
                  value={form.message}
                  onChange={handleChange} 
                  placeholder="Tell me about your project..." 
                  required 
                />
              </div>

              <div className="form-row-split">
                <div className="form-group">
                  <input 
                    id="contact-name" 
                    className="form-input-minimal" 
                    type="text" 
                    name="name" 
                    value={form.name}
                    onChange={handleChange} 
                    placeholder="Your Name" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    id="contact-email" 
                    className="form-input-minimal" 
                    type="email" 
                    name="email" 
                    value={form.email}
                    onChange={handleChange} 
                    placeholder="Your Email" 
                    required 
                  />
                </div>
              </div>

              <button 
                id="contact-submit" 
                type="submit" 
                className="btn-initialize-contact" 
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'INITIALIZING...' : 'INITIALIZE CONTACT'}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
