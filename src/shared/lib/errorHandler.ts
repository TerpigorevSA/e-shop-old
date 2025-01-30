import { ServerError } from '../types/serverTypes';

export const handleApiError = (error: ServerError[] | any) => {
  if (Array.isArray(error)) {
    error.forEach((err) => {
      console.error(`Error: ${err.message} (Field: ${err.fieldName || 'common'})`);
      alert(`Error: ${err.message}`);
    });
  } else {
    console.error('Unknown error', error);
    alert(`Error. Try later`);
  }
};
