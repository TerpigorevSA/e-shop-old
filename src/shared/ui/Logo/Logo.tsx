import React from 'react';
import style from './Logo.module.css';
import { Navigate, useNavigate } from 'react-router-dom';

type LogoProps = {
  to?:string;
}

const Logo: React.FC<LogoProps> = ({to}) => {
  const navigate = useNavigate()
  const handlerOnClick=()=>{
    to && navigate(to, {replace:true,});
  }
  return (
    <div className={style.wrapper} onClick={handlerOnClick}>
      <div className={style.caption}>
        <span style={{cursor:'pointer'}}>Logo</span>
      </div>
    </div>
  );
};

export default Logo;
