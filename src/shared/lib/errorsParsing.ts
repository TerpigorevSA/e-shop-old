import { ServerError, ErrorCode } from '../types/serverTypes';

export const getLocaleErrorMessage = (error: ServerError): string => {
  switch (error.extensions.code) {
    case ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD:
      return 'ErrorCode.ERR_INCORRECT_EMAIL_OR_PASSWORD';
    case ErrorCode.ERR_ACCOUNT_ALREADY_EXIST:
      return 'ErrorCode.ERR_ACCOUNT_ALREADY_EXIST';
    case ErrorCode.ERR_INCORRECT_PASSWORD:
      return 'ErrorCode.ERR_INCORRECT_PASSWORD';
    case ErrorCode.ERR_INVALID_PASSWORD:
      return 'ErrorCode.ERR_INVALID_PASSWORD';
    // case ErrorCode.ERR_FIELD_REQUIRED:
    // case ErrorCode.ERR_NOT_VALID:
    // case ErrorCode.ERR_AUTH:
    // case ErrorCode.ERR_NO_FILES:
    // case ErrorCode.ERR_NOT_ALLOWED:
    // case ErrorCode.ERR_NOT_FOUND:
    // case ErrorCode.ERR_VALIDATION_ERROR:
    // case ErrorCode.ERR_INVALID_QUERY_PARAMS:
    // case ErrorCode.ERR_INTERNAL_SERVER:
    default:
      return `${error.name}:\t${error.message}`;
  }
};
