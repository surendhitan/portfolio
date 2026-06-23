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
        setMsg(res.message || 'Message sent! I\'ll get back to you soon.');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(res.message || 'Failed to send');
      }
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.message || 'Failed to send. Please try again.');
    }
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Get In Touch</div>
          <h2 className="section-title">Contact Me</h2>
          <p className="section-subtitle">Have a project in mind? Let's talk and build something great together.</p>
        </div>
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-envelope" /></div>
              <div>
                <div className="contact-item-label">Email</div>
                <div className="contact-item-value">{profile?.email || 'surendran@example.com'}</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-phone" /></div>
              <div>
                <div className="contact-item-label">Phone</div>
                <div className="contact-item-value">{profile?.phone || '+91 9876543210'}</div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-map-marker-alt" /></div>
              <div>
                <div className="contact-item-label">Location</div>
                <div className="contact-item-value">{profile?.location || 'Tamil Nadu, India'}</div>
              </div>
            </div>
            <div>
              <div className="contact-item-label" style={{ marginBottom: '0.75rem' }}>Find Me On</div>
              <div className="social-links">
                {profile?.github_url && (
                  <a href={profile.github_url} target="_blank" rel="noreferrer" className="social-link" title="GitHub">
                    <i className="fab fa-github" />
                  </a>
                )}
                {profile?.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="social-link" title="LinkedIn">
                    <i className="fab fa-linkedin" />
                  </a>
                )}
                <a href="#" className="social-link" title="Twitter"><i className="fab fa-twitter" /></a>
                <a href="#" className="social-link" title="Instagram"><i className="fab fa-instagram" /></a>
              </div>
            </div>
          </div>

          <form className="glass contact-form" onSubmit={handleSubmit}>
            {status && status !== 'loading' && (
              <div className={`form-status ${status}`}>
                <i className={status === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'} />
                {msg}
              </div>
            )}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Your Name *</label>
                <input id="contact-name" className="form-input" type="text" name="name" value={form.name}
                  onChange={handleChange} placeholder="Surendran S" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input id="contact-email" className="form-input" type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="you@example.com" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Subject</label>
              <input id="contact-subject" className="form-input" type="text" name="subject" value={form.subject}
                onChange={handleChange} placeholder="Project inquiry..." />
            </div>
            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea id="contact-message" className="form-textarea" name="message" value={form.message}
                onChange={handleChange} placeholder="Tell me about your project..." required />
            </div>
            <button id="contact-submit" type="submit" className="btn btn-primary btn-submit" disabled={status === 'loading'}>
              {status === 'loading'
                ? <><i className="fas fa-circle-notch fa-spin" /> Sending...</>
                : <><i className="fas fa-paper-plane" /> Send Message</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
