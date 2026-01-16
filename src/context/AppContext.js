'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/data/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [theme, setTheme] = useState('dark');
    const [language, setLanguage] = useState('fr');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Theme initialization
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Language initialization
        const savedLang = localStorage.getItem('language') || 'fr';
        setLanguage(savedLang);

        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleLanguage = () => {
        const newLang = language === 'fr' ? 'en' : 'fr';
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
    };

    return (
        <AppContext.Provider value={{
            theme,
            toggleTheme,
            language,
            toggleLanguage,
            t: translations[language]
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}
