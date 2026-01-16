'use client';

import { useApp } from '@/context/AppContext';
import styles from './page.module.css';

export default function HackTheBoxWriteups() {
    const { t } = useApp();

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>{t.writeups.hackthebox.title} Writeups</h1>

            <div className={styles.content}>
                <div className={styles.emptyState}>
                    <p>🚧 {t.blog.wip} 🚧</p>
                    <p>{t.writeups.hackthebox.description}</p>
                </div>
            </div>
        </main>
    );
}
