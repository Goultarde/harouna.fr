'use client';

import { useApp } from '@/context/AppContext';
// import styles from './BlogPage.module.css';

export default function BlogPage() {
    const { t } = useApp();

    return (
        <main style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <h1 style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                {t.blog.title}
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'var(--foreground)', marginBottom: '2rem' }}>
                {t.blog.subtitle}
            </p>
            <div style={{ fontSize: '2rem' }}>
                {t.blog.wip}
            </div>
        </main>
    );
}
