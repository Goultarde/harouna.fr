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
                <Link href="/#contact">
                    <button className={styles.secondaryBtn}>{t.hero.contactMe}</button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
