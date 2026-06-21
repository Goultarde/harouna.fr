'use client';

import { useApp } from '@/context/AppContext';

const projectsData = {
  fr: [
    {
      title: 'Nihil',
      subtitle: 'Environnement Pentest Dockerisé',
      status: 'active',
      statusLabel: 'En cours',
      desc: 'Environnement de pentest complet et portable, entièrement dockerisé pour un déploiement rapide.',
      tech: ['Docker', 'Pentest', 'DevOps'],
      link: 'https://github.com/TheNullPigeons',
      span: 'span-2',
    },
    {
      title: 'Seemslegit',
      subtitle: 'Générateur de Malware',
      status: 'active',
      statusLabel: 'En cours',
      desc: "Développement d'un générateur de malware pour comprendre les mécanismes d'obfuscation et d'évasion. Objectif éducatif uniquement.",
      tech: ['maldev', 'Obfuscation', 'Evasion'],
      span: 'span-3',
    },
    {
      title: 'Kratos',
      subtitle: 'Agent Mythic C2',
      status: 'active',
      statusLabel: 'En cours',
      desc: "Développement d'un agent C2 compatible avec le framework Mythic. Fonctionnalités offensives avancées.",
      tech: ['C2', 'maldev', 'Mythic'],
      link: 'https://github.com/Goultarde/kratos',
      span: 'span-3',
    },
    {
      title: 'Lab Pentest IaaC',
      subtitle: 'Infrastructure as Code',
      status: 'done',
      statusLabel: 'Terminé',
      desc: "Création d'un lab de pentest Active Directory/Linux en Infrastructure as Code avec Vagrant et Ansible.",
      tech: ['Vagrant', 'Ansible', 'Active Directory'],
      link: 'https://0xbbuddha.github.io/pantheon-lab.github.io/',
      span: 'span-4',
    },
    {
      title: 'Infrastructures AD',
      subtitle: 'Windows Server',
      status: 'done',
      statusLabel: 'Terminé',
      desc: 'Installation d\'infrastructures complètes avec DNS, DHCP, IIS, GPO et relations de confiance inter-domaines.',
      tech: ['Windows Server', 'AD DS', 'DNS', 'DHCP'],
      span: 'span-2',
    },
    {
      title: 'Architecture SCCM',
      subtitle: 'Gestion de Parc',
      status: 'done',
      statusLabel: 'Terminé',
      desc: "Création d'une architecture SCCM standalone pour la gestion de parc informatique.",
      tech: ['SCCM', 'Windows Server'],
      span: 'span-2',
    },
    {
      title: 'Supervision ISR',
      subtitle: 'Monitoring GNU/Linux',
      status: 'done',
      statusLabel: 'Terminé',
      desc: "Supervision d'une infrastructure GNU/Linux avec Prometheus et Grafana.",
      tech: ['Prometheus', 'Grafana', 'Linux'],
      span: 'span-2',
    },
    {
      title: 'Outils Python',
      subtitle: 'Outils Offensifs',
      status: 'done',
      statusLabel: 'Terminé',
      desc: 'Développement d\'outils offensifs : ARP Spoofer, Port Scanner, Web Scraper, Keylogger.',
      tech: ['Python', 'Scapy', 'Requests'],
      span: 'span-2',
    },
  ],
  en: [
    {
      title: 'Nihil',
      subtitle: 'Dockerized Pentest Env',
      status: 'active',
      statusLabel: 'In progress',
      desc: 'Complete and portable pentest environment, fully dockerized for rapid deployment.',
      tech: ['Docker', 'Pentest', 'DevOps'],
      link: 'https://github.com/TheNullPigeons',
      span: 'span-2',
    },
    {
      title: 'Seemslegit',
      subtitle: 'Malware Generator',
      status: 'active',
      statusLabel: 'In progress',
      desc: 'Development of a malware generator to understand obfuscation and evasion mechanisms. Educational purpose only.',
      tech: ['maldev', 'Obfuscation', 'Evasion'],
      span: 'span-3',
    },
    {
      title: 'Kratos',
      subtitle: 'Mythic C2 Agent',
      status: 'active',
      statusLabel: 'In progress',
      desc: 'Development of a C2 agent compatible with the Mythic framework. Advanced offensive capabilities.',
      tech: ['C2', 'maldev', 'Mythic'],
      link: 'https://github.com/Goultarde/kratos',
      span: 'span-3',
    },
    {
      title: 'Pentest Lab IaaC',
      subtitle: 'Infrastructure as Code',
      status: 'done',
      statusLabel: 'Done',
      desc: 'Active Directory/Linux pentest lab built as Infrastructure as Code with Vagrant and Ansible.',
      tech: ['Vagrant', 'Ansible', 'Active Directory'],
      link: 'https://0xbbuddha.github.io/pantheon-lab.github.io/',
      span: 'span-4',
    },
    {
      title: 'AD Infrastructures',
      subtitle: 'Windows Server',
      status: 'done',
      statusLabel: 'Done',
      desc: 'Full AD infrastructure with DNS, DHCP, IIS, GPOs, OUs and cross-domain trust relationships.',
      tech: ['Windows Server', 'AD DS', 'DNS', 'DHCP'],
      span: 'span-2',
    },
    {
      title: 'SCCM Architecture',
      subtitle: 'Endpoint Management',
      status: 'done',
      statusLabel: 'Done',
      desc: 'Standalone SCCM architecture for fleet management.',
      tech: ['SCCM', 'Windows Server'],
      span: 'span-2',
    },
    {
      title: 'ISR Monitoring',
      subtitle: 'GNU/Linux Supervision',
      status: 'done',
      statusLabel: 'Done',
      desc: 'GNU/Linux infrastructure monitoring with Prometheus and Grafana.',
      tech: ['Prometheus', 'Grafana', 'Linux'],
      span: 'span-2',
    },
    {
      title: 'Python Tools',
      subtitle: 'Offensive Tooling',
      status: 'done',
      statusLabel: 'Done',
      desc: 'Offensive tools: ARP Spoofer, Port Scanner, Web Scraper, Keylogger.',
      tech: ['Python', 'Scapy', 'Requests'],
      span: 'span-2',
    },
  ],
};

const Projects = () => {
  const { language } = useApp();
  const projects = projectsData[language];

  return (
    <section className="section" id="projets">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="kicker"><span className="ix">03</span> {language === 'fr' ? 'Projets' : 'Projects'}</div>
            <h2>{language === 'fr' ? 'Projets' : 'Projects'}</h2>
          </div>
          <p className="desc">
            {language === 'fr'
              ? 'Projets personnels en sécurité offensive, infrastructure et développement d\'outils.'
              : 'Personal projects in offensive security, infrastructure and tool development.'}
          </p>
        </div>

        <div className="proj-grid">
          {projects.map((proj, i) => {
            const card = (
              <div className={`proj ${proj.span} ${proj.status}`}>
                <div className="proj-head">
                  <span className="proj-idx">{String(i + 1).padStart(2, '0')}</span>
                  <span className="proj-status">{proj.statusLabel}</span>
                </div>
                <h3 className="proj-title">{proj.title}</h3>
                <p className="proj-desc">{proj.desc}</p>
                <div className="proj-tech">
                  {proj.tech.map((t, j) => (
                    <span key={j}>{t}</span>
                  ))}
                </div>
                {proj.link && (
                  <span className="proj-link">
                    {language === 'fr' ? 'Voir le projet' : 'View project'} ↗
                  </span>
                )}
              </div>
            );

            return proj.link ? (
              <a key={i} href={proj.link} target="_blank" rel="noopener noreferrer" style={{ display: 'contents' }}>
                {card}
              </a>
            ) : (
              <div key={i} style={{ display: 'contents' }}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
