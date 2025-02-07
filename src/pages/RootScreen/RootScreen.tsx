import React from 'react';
import cn from 'clsx';
import style from './RootScreen.module.css';

const RootScreen: React.FC = () => {
  return (
    <>
      <p>Учебный проект заготовки под магазин.</p>
      <p>В проекте используются:</p>
      <ul>
        <li>React</li>
        <li>React Router Dom</li>
        <li>Redux</li>
        <li>RTK Query</li>
        <li>React Hook Form</li>
        <li>Чистые формы для фильров</li>
        <li>Yup</li>
        <li>i18next</li>
      </ul>
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
