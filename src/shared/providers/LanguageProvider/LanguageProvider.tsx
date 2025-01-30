import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../../contexts/LanguageContext/LanguageContext';
import { Languages } from '../../../app/localization/settings';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language as Languages);

  const switchLanguage = (language: Languages) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return <LanguageContext.Provider value={{ currentLanguage, switchLanguage }}>{children}</LanguageContext.Provider>;
};
