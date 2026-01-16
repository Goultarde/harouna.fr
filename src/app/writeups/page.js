'use client';

import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import styles from './page.module.css';

export default function Writeups() {
    const { t } = useApp();

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>{t.writeups.title}</h1>

            <div className={styles.grid}>
                <Link href="/writeups/hackthebox" className={styles.card}>
                    <div className={styles.imageContainer}>
                        <img src="/assets/hackthebox.svg" alt="HackTheBox" className={styles.logo} />
                    </div>
                    <div className={styles.content}>
                        <h2 className={styles.cardTitle}>{t.writeups.hackthebox.title}</h2>
                        <p className={styles.cardDescription}>{t.writeups.hackthebox.description}</p>
                    </div>
                </Link>
            </div>
        </main>
    );
}
