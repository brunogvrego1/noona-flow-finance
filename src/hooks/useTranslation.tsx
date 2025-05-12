
import { useState, useCallback, createContext, useContext, ReactNode } from 'react';
import { translations, Language, TranslationKey, TranslationDictionary } from '@/i18n/translations';

interface TranslationContextType {
  language: Language;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  changeLanguage: (lang: Language) => void;
  availableLanguages: { code: Language, name: string }[];
}

const defaultLanguage: Language = 'pt-BR';

// Fixed type assertion to ensure all codes are properly typed as Language
const availableLanguages: { code: Language, name: string }[] = [
  { code: 'pt-BR', name: 'Português (Brasil)' },
  { code: 'pt-PT', name: 'Português (Portugal)' },
  { code: 'en', name: 'English' },
  { code: 'cs', name: 'Čeština' },
  { code: 'is', name: 'Íslenska' },
];

const TranslationContext = createContext<TranslationContextType | null>(null);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage or use browser language or default
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang && Object.keys(translations).includes(savedLang)) {
      return savedLang;
    }
    
    const browserLang = navigator.language;
    if (browserLang.startsWith('pt-BR')) return 'pt-BR';
    if (browserLang.startsWith('pt')) return 'pt-PT';
    if (browserLang.startsWith('cs')) return 'cs';
    if (browserLang.startsWith('is')) return 'is';
    if (browserLang.startsWith('en')) return 'en';
    
    return defaultLanguage;
  });

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  }, []);

  const t = useCallback((key: TranslationKey, params?: Record<string, string | number>) => {
    const dict: TranslationDictionary = translations[language] || translations[defaultLanguage];
    let translation = dict[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(new RegExp(`{${paramKey}}`, 'g'), String(paramValue));
      });
    }
    
    return translation;
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, t, changeLanguage, availableLanguages }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

export default useTranslation;
