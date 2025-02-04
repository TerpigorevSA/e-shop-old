import { store } from '../../app/store/store';
import { getTokenFromLocalStorage, TOKEN_KEY } from './localStorage';
import { setAuthenticated, signout } from '../../features/Auth/model/slice';

export const setupAuthSync = () => {
  window.addEventListener('storage', (event) => {
    if (event.key === TOKEN_KEY) {
      if (event.newValue) {
        const token = getTokenFromLocalStorage();
        store.dispatch(setAuthenticated({ token }));
      } else {
        store.dispatch(signout());
      }
    }
  });
};
