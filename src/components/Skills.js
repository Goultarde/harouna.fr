'use client';

import { useApp } from '@/context/AppContext';
import styles from './Skills.module.css';

const Skills = () => {
    const { t, language } = useApp();

    // Data defined inside component to react to language changes if we were to translate items, 
    // but here mainly categories need translation. Items stay mostly same but could be translated if needed.
    const skillsData = [
        {
            category: t.skills.categories.web,
            items: ["SQLI", "XSS", "CSRF", "LFI/RFI", "XXE", "SSRF", "Burp Suite", "SQLMap"]
        },
        {
            category: t.skills.categories.ad,
            items: ["Enumération", "Mouvement Latéral", "Pivotant", "Persistance", "Tunneling", "Kerbrute", "BloodHound"]
        },
        {
            category: t.skills.categories.network,
            items: ["Samba AD", "Windows Server", "PFSense", "Cisco", "Wireshark", "Nmap", "Netcat"]
        },
        {
            category: t.skills.categories.languages,
            items: ["Python", "HTML/CSS/JS", "PHP", "Bash/Shell"]
        }
    ];

    return (
        <section className={styles.skillsSection}>
            <h2 className={styles.title}>{t.skills.title}</h2>
            <div className={styles.categories}>
                {skillsData.map((cat, index) => (
                    <div key={index} className={styles.category}>
                        <h3 className={styles.categoryTitle}>{cat.category}</h3>
                        <div className={styles.skillList}>
                            {cat.items.map((skill, i) => (
                                <span key={i} className={styles.skillTag}>{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
