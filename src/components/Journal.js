'use client';

import { useApp } from '@/context/AppContext';

const writings = {
  fr: [
    {
      date:  '2026',
      title: 'Relations de Trust AD',
      tag:   'Blog',
      desc:  'Comment les domaines AD se font confiance, et pourquoi c\'est souvent une mauvaise idee.',
      href:  '/blog/articles/active-directory/ad-trusts',
    },
    {
      date:  '2025',
      title: 'ForwardShell',
      tag:   'Blog',
      desc:  'Le shell oublie entre le Reverse, le Bind et le Webshell.',
      href:  '/blog/articles/forwardshell',
    },
    {
      date:  '2024',
      title: 'HackTheBox',
      tag:   'Writeups',
      desc:  'Writeups de machines HackTheBox resolues.',
      href:  '/blog/writeups',
    },
  ],
  en: [
    {
      date:  '2026',
      title: 'AD Trust Relationships',
      tag:   'Blog',
      desc:  'How AD domains trust each other, and why that is often a bad idea.',
      href:  '/blog/articles/active-directory/ad-trusts',
    },
    {
      date:  '2025',
      title: 'ForwardShell',
      tag:   'Blog',
      desc:  'The shell forgotten between Reverse, Bind and Webshell.',
      href:  '/blog/articles/forwardshell',
    },
    {
      date:  '2024',
      title: 'HackTheBox',
      tag:   'Writeups',
      desc:  'Write-ups for solved HackTheBox machines.',
      href:  '/blog/writeups',
    },
  ],
};

const Journal = () => {
  const { language } = useApp();
  const items = writings[language];
  const title = language === 'fr' ? 'Ecrits' : 'Writings';

  return (
    <section className="section paper" id="ecrits">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="kicker"><span className="ix">06</span> {title}</div>
            <h2>{title}</h2>
          </div>
          <p className="desc">
            {language === 'fr'
              ? 'Articles de blog et writeups sur le pentest et la cybersecurite.'
              : 'Blog posts and write-ups on pentesting and cybersecurity.'}
          </p>
        </div>

        <div className="writings">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="writing"
            >
              <span className="w-date">{item.date}</span>
              <span className="w-title">{item.title}</span>
              <span className="w-tag">{item.tag}</span>
              <span className="w-arr">&#8599;</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
