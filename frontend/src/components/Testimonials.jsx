import '../styles/Components.css';

export default function Testimonials({ testimonials }) {
  return (
    <section id="testimonials" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Client Reviews</div>
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-subtitle">Feedback from people I've had the pleasure of working with</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map(t => (
            <div key={t.id} className="glass testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <i key={i} className="fas fa-star" />
                ))}
              </div>
              <p className="testimonial-text">"{t.message}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.client_name.charAt(0)}</div>
                <div>
                  <div className="author-name">{t.client_name}</div>
                  <div className="author-title">{t.client_title} at {t.client_company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
