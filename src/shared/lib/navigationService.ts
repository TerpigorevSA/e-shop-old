import { NavigateFunction } from 'react-router-dom';

let navigate: NavigateFunction | null = null;

export const setNavigate = (navFn: NavigateFunction) => {
  navigate = navFn;
};

export const navigateTo = (path: string, state?: unknown) => {
  if (navigate) {
    navigate(path, { state });
  } else {
    console.warn('Сервис не инициализирован.');
    //throw new Error('Сервис не инициализирован.');
  }
};