import '../styles/Components.css';

export default function About({ profile }) {
  const scrollTo = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="about" className="section" style={{ background: 'var(--bg2)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Who I Am</div>
          <h2 className="section-title">About Me</h2>
        </div>
        <div className="about-layout">
          <div className="about-image-wrap">
            <div className="about-img-box">🧑‍💻</div>
            <div className="about-exp-badge">
              {profile?.years_experience && profile.years_experience > 0 ? (
                <>
                  <div className="big">{profile.years_experience}+</div>
                  <div className="small">Years of<br/>Experience</div>
                </>
              ) : (
                <>
                  <div className="big" style={{ fontSize: '1.4rem', fontWeight: 800 }}>Fresher</div>
                  <div className="small">Available<br/>for Intern/Job</div>
                </>
              )}
            </div>
          </div>
          <div>
            <p className="about-desc">{profile?.bio}</p>
            <div className="about-details">
              <div className="about-detail-item">
                <span className="detail-label">Location</span>
                <span className="detail-value"><i className="fas fa-map-marker-alt" style={{ color: 'var(--primary-light)', marginRight: 6 }} />{profile?.location}</span>
              </div>
              <div className="about-detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value" style={{ wordBreak: 'break-all' }}>{profile?.email}</span>
              </div>
              <div className="about-detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{profile?.phone}</span>
              </div>
              <div className="about-detail-item">
                <span className="detail-label">Status</span>
                <span className="detail-value" style={{ color: '#86efac' }}>✅ Available Now</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => scrollTo('#resume')}>
              <i className="fas fa-file-alt" style={{ marginRight: 8 }} /> View Resume Section
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
