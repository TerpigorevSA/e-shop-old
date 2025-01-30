import React from 'react';
import cn from 'clsx';
import style from './RootScreen.module.css';

const RootScreen: React.FC = () => {
  return (
    <>
      <p>Есть два (минимум) зарегистрированных ползователя.</p>
      <div className={cn(style.tab)}>
        <span className={cn(style.tabItem)}>user68@example.com</span>
        <span className={cn(style.tabItem)}>qqqqqqqq</span>
      </div>
      <div className={cn(style.tab)}>
        <span className={cn(style.tabItem)}>qwerty@qwerty.com</span>
        <span className={cn(style.tabItem)}>qqqqqqqq</span>
      </div>
    </>
  );
};

export default RootScreen;
