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
            color: "#cc5717"
        },
        {
            name: "eJPTv2",
            issuer: "eLearnSecurity",
            date: "2023",
            image: "/assets/certifications/eJPT.svg",
            color: "#ec3071"
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
                {certs.map((cert, index) => (
                    <div key={index} className={styles.card} style={{ borderColor: cert.color }}>
                        <div className={styles.imageContainer}>
                            <img src={cert.image} alt={cert.name} width="150" height="150" className={styles.certImage} />
                        </div>
                        <div className={styles.header}>
                            <h3 className={styles.certName}>{cert.name}</h3>
                            <span className={styles.issuer}>{cert.issuer}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Certifications;
