import { ServerErrors } from '../types/serverTypes';
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

const isServerError = (error: unknown): error is ServerErrors => {
  console.log('error', error);
  console.log(
    "typeof error === 'object'",
    typeof error === 'object',
    'error !== null',
    error !== null,
    "'errors' in error",
    'errors' in (error as any),
    'Array.isArray((error as ServerErrors).errors)',
    Array.isArray((error as ServerErrors).errors)
  );
  return (
    typeof error === 'object' && error !== null && 'errors' in error && Array.isArray((error as ServerErrors).errors)
  );
};
