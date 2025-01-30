import React from 'react';
import style from './Logo.module.css';

const Logo: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.caption}>
        <span>Logo</span>
      </div>
    </div>
  );
};

export default Logo;
