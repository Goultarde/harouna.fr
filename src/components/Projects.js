'use client';

import { useApp } from '@/context/AppContext';
import styles from './Projects.module.css';

const Projects = () => {
    const { t, language } = useApp();

    const projectsData = {
        fr: [
            {
                title: "Générateur de Malware",
                status: "En cours",
                description: "Création d’une PKI via HashiCorp Vault avec serveurs DNS bind9 chroot et clé tsig, serveur web nginx et apache2.",
                tech: ["HashiCorp Vault", "DNS", "Nginx", "Apache"]
            },
            {
                title: "Lab de Pentest IaaC",
                status: "Terminé",
                description: "Création d’un lab de pentest Active Directory/Linux en Infrastructure as Code avec Vagrant et Ansible. Accessible sur GitHub.",
                tech: ["Vagrant", "Ansible", "Active Directory", "Linux"]
            },
            {
                title: "Infrastructure Active Directory",
                status: "Terminé",
                description: "Installation d’une infrastructure complète avec machines clientes, serveurs DNS, DHCP, IIS, GPO, et OU.",
                tech: ["Windows Server", "AD DS", "DNS", "DHCP"]
            },
            {
                title: "Architecture SCCM",
                status: "Terminé",
                description: "Création d’une architecture SCCM standalone pour la gestion de parc.",
                tech: ["SCCM", "Windows Server"]
            },
            {
                title: "Supervision ISR",
                status: "Terminé",
                description: "Supervision d’une infrastructure GNU/Linux avec Prometheus et Grafana.",
                tech: ["Prometheus", "Grafana", "Linux"]
            },
            {
                title: "Outils Offensifs Python",
                status: "Terminé",
                description: "Développement d’outils : ARP Spoofer, Port Scanner, Web Scraper, Keylogger.",
                tech: ["Python", "Scapy", "Requests"]
            }
        ],
        en: [
            {
                title: "Malware Generator",
                status: "Ongoing",
                description: "Creation of a PKI via HashiCorp Vault with bind9 chroot DNS servers and tsig key, nginx and apache2 web server.",
                tech: ["HashiCorp Vault", "DNS", "Nginx", "Apache"]
            },
            {
                title: "IaaC Pentest Lab",
                status: "Completed",
                description: "Creation of an Active Directory/Linux pentest lab in Infrastructure as Code with Vagrant and Ansible. Accessible on GitHub.",
                tech: ["Vagrant", "Ansible", "Active Directory", "Linux"]
            },
            {
                title: "Active Directory Infrastructure",
                status: "Completed",
                description: "Installation of a complete infrastructure with client machines, DNS, DHCP, IIS, GPO, and OU servers.",
                tech: ["Windows Server", "AD DS", "DNS", "DHCP"]
            },
            {
                title: "SCCM Architecture",
                status: "Completed",
                description: "Creation of a standalone SCCM architecture for fleet management.",
                tech: ["SCCM", "Windows Server"]
            },
            {
                title: "ISR Supervision",
                status: "Completed",
                description: "Supervision of a GNU/Linux infrastructure with Prometheus and Grafana.",
                tech: ["Prometheus", "Grafana", "Linux"]
            },
            {
                title: "Python Offensive Tools",
                status: "Completed",
                description: "Development of tools: ARP Spoofer, Port Scanner, Web Scraper, Keylogger.",
                tech: ["Python", "Scapy", "Requests"]
            }
        ]
    };

    const projects = projectsData[language];

    return (
        <section className={styles.projectsSection}>
            <h2 className={styles.title}>{t.projects.title}</h2>
            <div className={styles.grid}>
                {projects.map((project, index) => (
                    <div key={index} className={styles.card}>
                        <span className={styles.status}>{project.status}</span>
                        <h3 className={styles.cardTitle}>{project.title}</h3>
                        <p className={styles.description}>{project.description}</p>
                        <div className={styles.techStack}>
                            {project.tech.map((t, i) => (
                                <span key={i} className={styles.techItem}>#{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
