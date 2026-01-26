'use client';

import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import forwardShellThumb from './forwardshell/images/forwardshell.webp';

export default function BlogPage() {
    const { t } = useApp();

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>{t.blog.title}</h1>
            <p className={styles.subtitle} style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                {t.blog.subtitle}
            </p>

            <div className={styles.grid}>
                <Link href="/blog/forwardshell" className={styles.card}>
                    <div className={styles.imageContainer}>
                        <Image
                            src={forwardShellThumb}
                            alt="ForwardShell Thumbnail"
                            className={styles.logo} // Keeping the class for now, might need adjustment but 'logo' styling usually works for contained images
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className={styles.content}>
                        <h2 className={styles.cardTitle}>{t.blog.forwardshell.title}</h2>
                        <p className={styles.cardDescription}>{t.blog.forwardshell.description}</p>
                    </div>
                </Link>
            </div>
        </main>
    );
}
