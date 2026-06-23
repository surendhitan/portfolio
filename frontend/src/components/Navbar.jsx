import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Resume', href: '#resume' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastActive = 'home';
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map(n => n.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) {
          setActive(id);
          if (id !== lastActive) {
            lastActive = id;
            window.history.replaceState(null, null, `#${id}`);
          }
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, null, href);
  };

  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        scrollTo(window.location.hash);
      }, 600);
    }
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <span className="logo">{profile?.name?.split(' ')[0] || 'Portfolio'}</span>
          <ul className="nav-links">
            {navItems.map(n => (
              <li key={n.href}>
                <a href={n.href} className={active === n.href.slice(1) ? 'active' : ''}
                  onClick={e => { e.preventDefault(); scrollTo(n.href); }}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary nav-cta"
            onClick={e => { e.preventDefault(); scrollTo('#contact'); }}>
            Hire Me
          </a>
          <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-close btn btn-outline" onClick={() => setMenuOpen(false)}>
          <i className="fas fa-times" /> Close
        </button>
        {navItems.map(n => (
          <a key={n.href} href={n.href} onClick={e => { e.preventDefault(); scrollTo(n.href); }}>
            {n.label}
          </a>
        ))}
      </div>
    </>
  );
}
