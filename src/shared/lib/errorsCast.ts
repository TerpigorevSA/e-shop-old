import { ServerErrors } from "../types/serverTypes";

export const isServerError = (error: unknown): error is ServerErrors => {
    return (
      typeof error === 'object' && error !== null && 'errors' in error && Array.isArray((error as ServerErrors).errors)
    );
  };
  
export const isNumber = (value: unknown): value is number => {
    return typeof value === 'number';
  };
  
  export const canCastToExtendedFetchError=(value:unknown):value is {status:string, error:string} => {
    return typeof value === 'object' && value !== null && 'status' in value  &&  'error' in value
  }
  
  export const canCastToFetchError=(value:unknown):value is {status:number, data:unknown} => {
    return typeof value === 'object' && value !== null && 'status' in value  &&  'data' in value
  }
  