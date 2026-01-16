'use client';

import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import styles from './Certifications.module.css';

// Importing JSON data directly if possible, or we could fetch them.
// Since they are JSON files in assets, we might need to fetch or just hardcode the data if it's static.
// Given the file names, these look like verifiable credentials. 
// For now, I will create a component that links to them or displays them.
// Since the user provided JSONs, I'll assume they contain metadata about the certs.

const Certifications = () => {
    const { t } = useApp();

    const certs = [
        {
            name: "OSCP",
            issuer: "OffSec",
            date: "2026",
            image: "/assets/certifications/OSCP.svg",
            color: "#cc5717",
            link: "https://credentials.offsec.com/f29c084b-e5c8-4fa1-893d-f4a243a7648f#acc.F1jkArlJ"
        },
        {
            name: "eJPTv2",
            issuer: "eLearnSecurity",
            date: "2023",
            image: "/assets/certifications/eJPT.svg",
            color: "#ec3071",
            link: "https://certs.ine.com/da66f12e-a0ec-484f-9209-744f6c67c112#acc.kKe1UCEH"
        },
        {
            name: "Dante Pro Lab",
            issuer: "HackTheBox",
            date: "2023",
            image: "/assets/certifications/DanteProLab.svg",
            color: "#fc780cff"
        },
        {
            name: "Zephyr Pro Lab",
            issuer: "HackTheBox",
            date: "2023",
            image: "/assets/certifications/ZephyrProLab.svg",
            color: "#89eff6ff"
        }
    ];

    return (
        <section className={styles.certSection}>
            <h2 className={styles.title}>Certifications</h2>
            <div className={styles.grid}>
                {certs.map((cert, index) => {
                    const CardContent = () => (
                        <>
                            <div className={styles.imageContainer}>
                                <img src={cert.image} alt={cert.name} width="150" height="150" className={styles.certImage} />
                            </div>
                            <div className={styles.header}>
                                <h3 className={styles.certName}>{cert.name}</h3>
                                <span className={styles.issuer}>{cert.issuer}</span>
                            </div>
                        </>
                    );

                    return cert.link ? (
                        <a
                            key={index}
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.card}
                            style={{ borderColor: cert.color }}
                        >
                            <CardContent />
                        </a>
                    ) : (
                        <div key={index} className={styles.card} style={{ borderColor: cert.color }}>
                            <CardContent />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Certifications;
