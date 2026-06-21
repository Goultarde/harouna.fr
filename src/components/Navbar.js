'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';

const NAV_SECTIONS = [
  { label: { fr: 'Profil', en: 'About' },    id: 'profil'  },
  { label: { fr: 'Projets', en: 'Projects' }, id: 'projets' },
];

const Navbar = () => {
  const { language, setLanguage } = useApp();
  const { theme, toggleTheme } = useTheme();

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/#' + id;
    }
  };

  return (
    <nav className="nav">
      <div className="shell">
        <div className="nav-inner">
          <div className="nav-brand">
            <Link href="/" aria-label="Accueil">
              <img src="/assets/HC_logo_100.webp" alt="HC" width="28" height="28" />
            </Link>
            <Link href="/" className="full">Harouna Coulibaly</Link>
          </div>

          <div className="nav-links">
            {NAV_SECTIONS.map(({ label, id }) => (
              <a key={id} href={`/#${id}`} onClick={(e) => scrollTo(e, id)}>
                {label[language]}
              </a>
            ))}
            <a href="/blog">Blog</a>
          </div>

          <div className="nav-right">
            <button
              className="nav-theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'ink' ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {theme === 'ink' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <div className="nav-lang">
              <button
                className={language === 'fr' ? 'on' : ''}
                onClick={() => setLanguage('fr')}
              >
                FR
              </button>
              <button
                className={language === 'en' ? 'on' : ''}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
