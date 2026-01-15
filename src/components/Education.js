'use client';

import { useApp } from '@/context/AppContext';
import styles from './Education.module.css';

const Education = () => {
    const { t } = useApp();

    return (
        <section className={styles.educationSection}>
            <h2 className={styles.title}>{t.education.title}</h2>
            <div className={styles.timeline}>

                <div className={styles.item}>
                    <div className={styles.school}>Oteria Cyber School</div>
                    <div className={styles.degree}>Mastère 1</div>
                    <div className={styles.year}>{t.education.current}</div>
                </div>

                <div className={styles.item}>
                    <div className={styles.school}>Maldevacademy</div>
                    <div className={styles.degree}>Malware Development</div>
                    <div className={styles.year}>{t.education.current}</div>
                </div>

                <div className={styles.item}>
                    <div className={styles.school}>Offsec</div>
                    <div className={styles.degree}>PEN 200 (OSCP)</div>
                    <div className={styles.year}>2025</div>
                </div>

                <div className={styles.item}>
                    <div className={styles.school}>Guardia Cybersecurity School</div>
                    <div className={styles.degree}>Bachelor</div>
                    <div className={styles.year}>2022 - 2024</div>
                </div>

            </div>
        </section>
    );
};

export default Education;
