import { createContext, useContext } from 'react';
import { Languages } from '../../../app/localization/settings';

type LanguageContextProps = {
  currentLanguage: Languages;
  switchLanguage: (language: Languages) => void;
};

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default useLanguage;
