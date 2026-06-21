'use client';

import { useApp } from '@/context/AppContext';

const content = {
  fr: {
    kicker: '01',
    title:  'Profil',
    desc:   'Qui je suis et ce que je fais.',
    p1:     "Étudiant en Mastère Cybersécurité, je me forme aux techniques offensives depuis deux ans. Passionné par la sécurité, j'explore les systèmes via HackTheBox, des projets Red Team et du développement d'outils offensifs.",
    p2:     "Je recherche une alternance en Pentest (1 semaine cours / 3 semaines entreprise) pour appliquer mes compétences dans un contexte professionnel réel.",
    fbTitle: 'Identité',
    rows: [
      { dt: 'Statut',       dd: 'Étudiant en alternance' },
      { dt: 'Formation',    dd: 'Mastère Cybersécurité' },
      { dt: 'Lieu',         dd: 'France' },
      { dt: 'Recherche',    dd: 'Alternance Pentest', acc: true },
    ],
  },
  en: {
    kicker: '01',
    title:  'About',
    desc:   'Who I am and what I do.',
    p1:     "Cybersecurity Master's student, training in offensive techniques for over two years. Security-focused, I explore systems through HackTheBox, Red Team projects and offensive tooling.",
    p2:     "Seeking a Pentest apprenticeship (1 week school / 3 weeks company) to apply my skills in a real professional environment.",
    fbTitle: 'Identity',
    rows: [
      { dt: 'Status',      dd: 'Apprentice student' },
      { dt: 'Training',    dd: "Master's in Cybersecurity" },
      { dt: 'Location',    dd: 'France' },
      { dt: 'Seeking',     dd: 'Pentest Apprenticeship', acc: true },
    ],
  },
};

const Profil = () => {
  const { language } = useApp();
  const c = content[language];

  return (
    <section className="section" id="profil">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="kicker"><span className="ix">{c.kicker}</span> {c.title}</div>
            <h2>{c.title}</h2>
          </div>
          <p className="desc">{c.desc}</p>
        </div>

        <div className="profil">
          <div className="profil-prose">
            <p className="lead">{c.p1}</p>
            <p className="small">{c.p2}</p>
          </div>

          <aside className="factbox">
            <h4>{c.fbTitle}</h4>
            <dl>
              {c.rows.map((row, i) => (
                <div key={i} className="row">
                  <dt>{row.dt}</dt>
                  <dd>{row.acc ? <b>{row.dd}</b> : row.dd}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Profil;
