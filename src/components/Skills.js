'use client';

import { useApp } from '@/context/AppContext';

const skillsData = {
  fr: [
    {
      title: 'Active Directory',
      items: ['Enumeration', 'Mouvement Lateral', 'Pivoting', 'Persistance', 'Tunneling'],
    },
    {
      title: 'Pentest Web',
      items: ['SQLi', 'XSS', 'CSRF', 'LFI/RFI', 'XXE', 'SSRF', 'Burp Suite'],
    },
    {
      title: 'Reseau & SysAdmin',
      items: ['Samba AD', 'Windows Server', 'PFSense', 'Cisco', 'Prometheus', 'Grafana'],
    },
    {
      title: 'Red Teaming',
      items: ['Cobalt Strike', 'Mythic C2', 'Artifact Kit', 'maldev', 'OPSEC'],
    },
    {
      title: 'Langages',
      items: ['Python', 'HTML/CSS/JS', 'PHP', 'Bash/Shell', 'C'],
    },
  ],
  en: [
    {
      title: 'Active Directory',
      items: ['Enumeration', 'Lateral Movement', 'Pivoting', 'Persistence', 'Tunneling'],
    },
    {
      title: 'Web Pentest',
      items: ['SQLi', 'XSS', 'CSRF', 'LFI/RFI', 'XXE', 'SSRF', 'Burp Suite'],
    },
    {
      title: 'Network & SysAdmin',
      items: ['Samba AD', 'Windows Server', 'PFSense', 'Cisco', 'Prometheus', 'Grafana'],
    },
    {
      title: 'Red Teaming',
      items: ['Cobalt Strike', 'Mythic C2', 'Artifact Kit', 'maldev', 'OPSEC'],
    },
    {
      title: 'Languages',
      items: ['Python', 'HTML/CSS/JS', 'PHP', 'Bash/Shell', 'C'],
    },
  ],
};

const Skills = () => {
  const { language } = useApp();
  const cats = skillsData[language];

  return (
    <section className="section paper" id="competences">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="kicker"><span className="ix">02</span> {language === 'fr' ? 'Competences' : 'Skills'}</div>
            <h2>{language === 'fr' ? 'Competences' : 'Skills'}</h2>
          </div>
          <p className="desc">
            {language === 'fr'
              ? 'Techniques offensives, administration systeme et developpement d\'outils.'
              : 'Offensive techniques, system administration and tool development.'}
          </p>
        </div>

        <div className="skills">
          {cats.map((cat, i) => (
            <div key={i} className="skill-cat">
              <header>
                <h3>{cat.title}</h3>
                <span className="n">{String(cat.items.length).padStart(2, '0')}</span>
              </header>
              <div className="skill-tags">
                {cat.items.map((item, j) => (
                  <span key={j} className="skill-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
