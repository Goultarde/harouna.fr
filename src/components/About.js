'use client';

import { useApp } from '@/context/AppContext';
import styles from './About.module.css';

const About = () => {
    const { t } = useApp();

    return (
        <section className={styles.about} id="about">
            <div className={styles.container}>
                <div className={styles.bio}>
                    <h2 className={styles.title}>{t.about.title}</h2>
                    <p className={styles.text}>
                        {t.about.p1} <span className={styles.highlight}>{t.about.p1_highlight}</span> {t.about.p1_end}
                    </p>
                    <p className={styles.text}>
                        {t.about.p2}
                    </p>
                    <p className={styles.text}>
                        {t.about.p3}
                    </p>
                </div>
                {/* Education moved to Portfolio */}
            </div>
        </section>
    );
};

export default About;
