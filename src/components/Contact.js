'use client';

import { useApp } from '@/context/AppContext';

const Contact = () => {
  const { language } = useApp();

  const isFr = language === 'fr';
  const footerMarkText = 'Coulibaly';

  return (
    <footer className="colophon" id="contact">
      <div className="shell">
        <div className="colophon-head">
          <div className="colophon-cta">
          </div>
        </div>

        <div className="colophon-grid">
          <div>
            <h5>{isFr ? 'Contact' : 'Contact'}</h5>
            <div className="social-row">
              <a href="https://linkedin.com/in/harouna-m-coulibaly-229a2722a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src="/assets/linkedin.svg" alt="LinkedIn" width="18" height="18" className="icon-color" />
              </a>
            </div>
          </div>

          <div>
            <h5>{isFr ? 'Profils' : 'Profiles'}</h5>
            <ul>
              <li>
                <a href="https://github.com/Goultarde" target="_blank" rel="noopener noreferrer">
                  GitHub <span className="ext">↗</span>
                </a>
              </li>
              <li>
                <a href="https://app.hackthebox.com/public/users/1505253" target="_blank" rel="noopener noreferrer">
                  HackTheBox <span className="ext">↗</span>
                </a>
              </li>
              <li>
                <a href="https://portal.offsec.com/public-profile/1b006de3-2f37-11f0-9794-0ad45fbd5c7b" target="_blank" rel="noopener noreferrer">
                  OffSec <span className="ext">↗</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5>{isFr ? 'Navigation' : 'Navigation'}</h5>
            <ul>
              <li><a href="/#profil">{isFr ? 'Profil' : 'About'}</a></li>
              <li><a href="/#projets">{isFr ? 'Projets' : 'Projects'}</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/writeups">Writeups</a></li>
            </ul>
          </div>

        </div>

        <div className="colophon-foot">
          <span>© {new Date().getFullYear()} Harouna Coulibaly</span>

        </div>

        <div className="colophon-mono-mark" aria-hidden="true">{footerMarkText}</div>
      </div>
    </footer>
  );
};

export default Contact;
