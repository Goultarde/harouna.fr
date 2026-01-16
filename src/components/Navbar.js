'use client';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { t, theme, toggleTheme, language, toggleLanguage } = useApp();
    const [isPinned, setIsPinned] = useState(true);

    const togglePin = () => {
        setIsPinned(!isPinned);
    };

    return (
        <nav className={`${styles.navbar} ${isPinned ? styles.pinned : styles.unpinned}`}>
            <div className={styles.leftSection}>
                <div className={styles.logo}>
                    <Link href="/" aria-label="Accueil">
                        <img src="/assets/HC_logo_100.webp" alt="Harouna Coulibaly Logo" width="50" height="50" style={{ height: '50px', width: 'auto' }} fetchPriority="high" />
                    </Link>
                </div>

            </div>
            <div className={styles.links}>
                <Link href="/" className={styles.link}>{t.navbar.home}</Link>
                <Link href="/portfolio" className={styles.link}>{t.navbar.portfolio}</Link>
                <Link href="/blog" className={styles.link}>{t.navbar.blog}</Link>

            </div>
            <div className={styles.controls}>
                <button onClick={toggleLanguage} className={styles.controlBtn} aria-label="Switch Language">
                    {language === 'fr' ? '🇬🇧' : '🇫🇷'}
                </button>
                <button onClick={toggleTheme} className={styles.controlBtn} aria-label="Toggle Theme">
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                <button onClick={togglePin} className={styles.controlBtn} title={isPinned ? "Unpin Navbar" : "Pin Navbar"} aria-label={isPinned ? "Unpin Navbar" : "Pin Navbar"}>
                    {isPinned ? '📌' : '📍'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
