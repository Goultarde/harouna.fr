'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/data/translations';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguageState] = useState('fr');

  useEffect(() => {
    const saved = localStorage.getItem('language') || 'fr';
    setLanguageState(saved);
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    try { localStorage.setItem('language', lang); } catch {}
  };

  const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      toggleLanguage,
      t: translations[language],
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
