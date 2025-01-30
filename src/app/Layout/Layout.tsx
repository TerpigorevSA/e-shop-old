import React, { FC } from 'react';
import cn from 'clsx';
import Header from '../../shared/ui/Header/Header';
import style from './Layout.module.css';
import Logo from '../../shared/ui/Logo/Logo';
import ThemeSwitcher from '../../shared/ui/ThemeSwitcher/ThemeSwitcher';
import LanguageSwitcher from '../../shared/ui/LanguageSwitcher/LanguageSwitcher';
import { Outlet } from 'react-router-dom';
import NavigationBar, { NavItem } from '../../shared/ui/NavigationBar/NavigationBar';
import CartIndicator from '../../features/Cart/ui/CartIndicator/CartIndicator';

type LayoutProps = {
  menuItems: NavItem[];
};

const Layout: FC<LayoutProps> = ({ menuItems }) => {
  return (
    <div className={cn(style.Layout)}>
      <Header>
        <div className={style.item}>
          <Logo />
        </div>
        <div className={style.item}>
          <NavigationBar menuItems={menuItems} />
        </div>
        <div className={style.right_wrapper}>
          <div className={style.item}>
            <CartIndicator />
          </div>
          <div className={style.item}>
            <ThemeSwitcher />
          </div>
          <div className={style.item}>
            <LanguageSwitcher />
          </div>
        </div>
      </Header>
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
