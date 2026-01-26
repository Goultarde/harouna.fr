'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import styles from './Hero.module.css';

const Hero = () => {
    const { t } = useApp();

    return (
        <section className={styles.hero}>
            <h2 className={styles.subtitle}>{t.hero.subtitle}</h2>
            <h1 className={styles.title}>Harouna COULIBALY</h1>
            <p className={styles.description}>{t.hero.description}</p>
            <div className={styles.ctaGroup}>
                <Link href="/portfolio">
                    <button className={styles.primaryBtn}>{t.hero.viewPortfolio}</button>
                </Link>
                <Link href="/blog">
                    <button className={styles.secondaryBtn}>{t.hero.viewBlog}</button>
                </Link>


            </div>
            <div className={styles.socials}>
                <a href="https://linkedin.com/in/harouna-m-coulibaly-229a2722a/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                    <img src="/assets/linkedin.svg" alt="LinkedIn" width="32" height="32" className={styles.socialIcon} />
                </a>
                <a href="https://github.com/Goultarde" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                    <img src="/assets/Github.svg" alt="GitHub" width="32" height="32" className={styles.socialIcon} />
                </a>
                <a href="https://app.hackthebox.com/public/users/1505253" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="HackTheBox">
                    <img src="/assets/hackthebox.svg" alt="HackTheBox" width="32" height="32" className={styles.socialIcon} />
                </a>
                <a href="https://portal.offsec.com/public-profile/1b006de3-2f37-11f0-9794-0ad45fbd5c7b" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="OffSec">
                    <img src="/assets/Offsec_logo.svg" alt="OffSec" width="32" height="32" className={styles.socialIcon} />
                </a>
            </div>
        </section>
    );
};

export default Hero;
