'use client';

import { useApp } from '@/context/AppContext';
import styles from './Contact.module.css';

const Contact = () => {
    const { t } = useApp();

    return (
        <footer className={styles.footer} id="contact">
            <h2 className={styles.title}>{t.contact.title}</h2>
            <div className={styles.links}>
                <a href="https://portal.offsec.com/public-profile/1b006de3-2f37-11f0-9794-0ad45fbd5c7b" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <img src="/assets/Offsec_logo.svg" alt="OffSec" className={styles.icon} />
                </a>
                <a href="https://linkedin.com/in/harouna-m-coulibaly-229a2722a/" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <img src="/assets/linkedin.svg" alt="LinkedIn" className={styles.icon} />
                </a>
                <a href="https://github.com/Goultarde" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <img src="/assets/Github.svg" alt="GitHub" className={styles.icon} />
                </a>
                <a href="https://app.hackthebox.com/users/1505253" target="_blank" rel="noopener noreferrer" className={styles.link}>
                    <img src="/assets/hackthebox.svg" alt="HackTheBox" className={styles.icon} />
                </a>
            </div>
            <p className={styles.copyright}>
                © {new Date().getFullYear()} Harouna Coulibaly.
            </p>
        </footer>
    );
};

export default Contact;
