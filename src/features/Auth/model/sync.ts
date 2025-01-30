import { store } from '../../../app/store/store';
import { getTokenFromLocalStorage, TOKEN_KEY } from '../../../shared/lib/localStorage';
import { getProfile } from '../../../entities/User/model/thunks';
import { setAuthenticated } from './slice';
import { signout } from './thunks';

export const setupAuthSync = () => {
  window.addEventListener('storage', (event) => {
    if (event.key === TOKEN_KEY) {
      if (event.newValue) {
        store.dispatch(getProfile());
        const token = getTokenFromLocalStorage();
        store.dispatch(setAuthenticated({ token }));
      } else {
        store.dispatch(signout());
      }
    }
  });
};
