'use client';

import { useRef, useState } from 'react';
import { useApp } from '@/context/AppContext';

const certs = [
  {
    name:    'OSCP',
    issuer:  'OffSec',
    status:  'done',
    label:   { fr: 'Obtenu - 2026', en: 'Achieved - 2026' },
    image:   '/assets/certifications/OSCP.svg',
    link:    'https://credentials.offsec.com/f29c084b-e5c8-4fa1-893d-f4a243a7648f#acc.F1jkArlJ',
  },
  {
    name:    'CPTS',
    issuer:  'HackTheBox',
    status:  'done',
    label:   { fr: 'Obtenu - 2026', en: 'Achieved - 2026' },
    image:   '/assets/certifications/CPTS_LOGO.webp',
    link:    'https://profile.hackthebox.com/certificate/HTBCERT-56C2725F80',
  },
  {
    name:    'CRTO',
    issuer:  'Zero-Point Security',
    status:  'done',
    label:   { fr: 'Obtenu - 2026', en: 'Achieved - 2026' },
    image:   '/assets/certifications/CRTO_LOGO.webp',
    link:    'https://certs.zeropointsecurity.co.uk/de7b9537-420b-463f-b31c-5c27f47fc776',
  },
  {
    name:    'eJPTv2',
    issuer:  'eLearnSecurity',
    status:  'done',
    label:   { fr: 'Obtenu - 2024', en: 'Achieved - 2024' },
    image:   '/assets/certifications/eJPT.svg',
    link:    'https://certs.ine.com/da66f12e-a0ec-484f-9209-744f6c67c112#acc.kKe1UCEH',
  },
  {
    name:    'Dante Pro Lab',
    issuer:  'HackTheBox',
    status:  'done',
    label:   { fr: 'Complete - 2025', en: 'Completed - 2025' },
    image:   '/assets/certifications/DanteProLab.svg',
  },
  {
    name:    'Zephyr Pro Lab',
    issuer:  'HackTheBox',
    status:  'done',
    label:   { fr: 'Complete - 2025', en: 'Completed - 2025' },
    image:   '/assets/certifications/ZephyrProLab.svg',
  },
];

const TiltBadge = ({ image, name }) => {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / (height / 2)) * -10;
    const rotateY = ((x - width / 2) / (width / 2)) * 10;
    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.75, 1.75, 1.75)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1.2, 1.2, 1.2)',
      transition: 'transform 0.4s ease-in-out',
    });
  };

  const handleClick = () => {
    const img = imgRef.current;
    if (!img) return;
    img.classList.remove('spinning');
    void img.offsetWidth; // force reflow pour relancer l'animation
    img.classList.add('spinning');
    img.addEventListener('animationend', () => img.classList.remove('spinning'), { once: true });
  };

  return (
    <div
      ref={ref}
      className="badge"
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img ref={imgRef} src={image} alt={name} loading="lazy" decoding="async" />
    </div>
  );
};

const Certifications = () => {
  const { language } = useApp();

  return (
    <section className="section paper tight" id="certifications">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="kicker"><span className="ix">04</span> {language === 'fr' ? 'Certifications' : 'Certifications'}</div>
            <h2>Certifications</h2>
          </div>
          <p className="desc">
            {language === 'fr'
              ? 'Certifications obtenues et en cours de preparation.'
              : 'Achieved certifications and ones currently in preparation.'}
          </p>
        </div>

        <div className="certs-row">
          {certs.map((cert, i) => {
            const card = (
              <div className={`cert ${cert.status}`}>
                <TiltBadge image={cert.image} name={cert.name} />
                <h4>{cert.name}</h4>
                <p className="meta">{cert.issuer} / {cert.label[language]}</p>
              </div>
            );

            return cert.link ? (
              <a key={i} href={cert.link} target="_blank" rel="noopener noreferrer">
                {card}
              </a>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
