import React, { FC } from 'react';
import cn from 'clsx';
import { LanguageProvider } from '../../shared/providers/LanguageProvider/LanguageProvider';
import LanguageSwitcher from '../../shared/ui/LanguageSwitcher/LanguageSwitcher';
import ProductItem from '../../entities/Product/ui/ProductItem/ProductItem';
import style from './LanguageSwitcherViewer.module.css';

const LanguageSwitcherViewer: FC = () => {
  return (
    <>
      <LanguageProvider>
        <div className={cn(style.wrapper)}>
          <LanguageSwitcher />
        </div>
        <hr />
        <ProductItem
          name="Lorem ipsum"
          price={19.95}
          desc="Lorem ipsum dolor sit amet consectetur adipiscing elit nostra."
          photo="https://via.placeholder.com/500.png?text=Lorem+ipsum"
        />
      </LanguageProvider>
    </>
  );
};

export default LanguageSwitcherViewer;
