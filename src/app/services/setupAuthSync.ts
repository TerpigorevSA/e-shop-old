import { store } from '../store/store';
import { getTokenFromLocalStorage, TOKEN_KEY } from '../../shared/lib/localStorage';
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
