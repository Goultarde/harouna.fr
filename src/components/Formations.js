'use client';

import { useApp } from '@/context/AppContext';

const formations = {
  fr: [
    {
      years:   '2025 - 2026',
      title:   'Master en cybersécurité',
      current: true,
      place:   'Oteria',
      desc:    'Formation en securite offensive, gouvernance et gestion de la securite des systemes d\'information.',
    },
    {
      years:   '2024 - 2025',
      title:   'Bachelor en cybersécurité',
      current: false,
      place:   'Oteria',
      desc:    'Formation en cybersecurite : securite offensive, administration systeme et reseaux.',
    },
  ],
  en: [
    {
      years:   '2025 - 2026',
      title:   "Cybersecurity Master's Degree",
      current: true,
      place:   'Oteria',
      desc:    'Offensive security, governance and information systems security management.',
    },
    {
      years:   '2024 - 2025',
      title:   'Bachelor in Cybersecurity',
      current: false,
      place:   'Oteria',
      desc:    'Cybersecurity training: offensive security, system and network administration.',
    },
  ],
};

const Formations = () => {
  const { language } = useApp();
  const items = formations[language];

  return (
    <section className="section" id="formations">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="kicker"><span className="ix">05</span> {language === 'fr' ? 'Formation' : 'Education'}</div>
            <h2>{language === 'fr' ? 'Formation' : 'Education'}</h2>
          </div>
          <p className="desc">
            {language === 'fr'
              ? 'Parcours academique en cybersecurite et systemes d\'information.'
              : 'Academic background in cybersecurity and information systems.'}
          </p>
        </div>

        <div className="edu">
          {items.map((item, i) => (
            <div key={i} className="edu-row">
              <div className="edu-year">{item.years}</div>
              <div className="edu-body">
                <h4>
                  {item.title}
                  {item.current && (
                    <span className="current">{language === 'fr' ? 'En cours' : 'Current'}</span>
                  )}
                </h4>
                <div className="place">{item.place}</div>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Formations;
