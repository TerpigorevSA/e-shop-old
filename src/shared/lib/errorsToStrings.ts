import { ServerErrors } from '../types/serverTypes';
import { isServerError } from './errorsCast';
import { getLocalizedErrorMessage } from './errorsParsing';

export const errorsToStrings = (error: unknown): string[] => {
  if (isServerError(error)) {
    error.errors.forEach((err) => {
      console.error(`Error [${err.extensions.code}]: ${err.message} ${err?.fieldName || 'common'}`);
      if (err.fieldName) {
        console.error(`Field: ${err.fieldName}`);
      }
    });
    return error.errors.map((error) => getLocalizedErrorMessage(error));
  }

  console.error('Unhandled error:', error);
  return [`Unknown error: ${error}`];
};
