import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { en } from '../i18n/en';
import { ar } from '../i18n/ar';

type Theme = 'light' | 'dark';
type Language = 'en' | 'ar';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = { en, ar };

// Helper to get nested values from object by string path
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark'; // default
  });

  const [language, setLanguageState] = useState<Language>(() => {
     if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem('language');
      if (storedLang === 'en' || storedLang === 'ar') return storedLang;
    }
    return 'en';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  useEffect(() => {
    const root = window.document.documentElement;
    const newDir = language === 'ar' ? 'rtl' : 'ltr';
    root.lang = language;
    root.dir = newDir;
    localStorage.setItem('language', language);
  }, [language]);


  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const t = useCallback((key: string): string => {
    const translation = getNestedValue(translations[language], key);
    return translation || key;
  }, [language]);
  
  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <AppContext.Provider value={{ theme, setTheme, language, setLanguage, t, dir }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
