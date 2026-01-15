'use client';

import { useApp } from '@/context/AppContext';

export default function BlogPage() {
    const { t } = useApp();

    return (
        <main style={{
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            textAlign: 'center'
        }}>
            <h1 style={{
                fontSize: '3rem',
                color: 'var(--primary)',
                marginBottom: '1rem',
                textTransform: 'uppercase'
            }}>
                {t.blog.title}
            </h1>
            <p style={{ color: 'var(--foreground)', fontSize: '1.2rem', opacity: 0.8 }}>
                {t.blog.subtitle}
            </p>
            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                border: '1px dashed var(--secondary)',
                borderRadius: '8px',
                color: 'var(--foreground)'
            }}>
                {t.blog.wip}
            </div>
        </main>
    );
}
