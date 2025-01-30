import { Stringified } from '../types/serverTypes';

export const stringifyObject = <T>(obj: T): Stringified<T> => {
  const result: Partial<Stringified<T>> = {};

  for (const key in obj) {
    const value = obj[key as keyof T];

    if (typeof value === 'object' && value !== null) {
      result[key as keyof Stringified<T>] = JSON.stringify(value) as any;
    } else if (typeof value === 'string' && value !== null) {
      result[key as keyof Stringified<T>] = `"${value}"` as any;
    } else {
      result[key as keyof Stringified<T>] = value as any;
    }
  }

  return result as Stringified<T>;
};
