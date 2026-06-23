import '../styles/Components.css';

export default function Services({ services }) {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">What I Offer</div>
          <h2 className="section-title">My Services</h2>
          <p className="section-subtitle">End-to-end development services to bring your ideas to life</p>
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <div key={s.id} className="glass service-card fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="service-icon">
                <i className={s.icon} />
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
