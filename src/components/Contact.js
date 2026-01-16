'use client';

import { useApp } from '@/context/AppContext';
import styles from './Contact.module.css';

const Contact = () => {
    const { t } = useApp();

    return (
        <footer className={styles.footer} id="contact">
            <p className={styles.copyright}>
                © {new Date().getFullYear()} Harouna Coulibaly.
            </p>
        </footer>
    );
};

export default Contact;
