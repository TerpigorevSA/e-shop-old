import React from 'react';
import useLanguage from '../../contexts/LanguageContext/LanguageContext';
import { Languages } from '../../../app/localization/settings';
import style from './LanguageSwitcher.module.css';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, switchLanguage } = useLanguage();

  return (
    <div className={style.wrapper}>
      <button
        className={style.button}
        onClick={() => switchLanguage(Languages.en)}
        hidden={currentLanguage === Languages.en}
      >
        English
      </button>
      <button
        className={style.button}
        onClick={() => switchLanguage(Languages.ru)}
        hidden={currentLanguage === Languages.ru}
      >
        Русский
      </button>
    </div>
  );
};

export default LanguageSwitcher;
