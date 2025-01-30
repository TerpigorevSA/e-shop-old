const cutStringHelper = (value: string | undefined, length: number): string | undefined => {
  return value && value.length > length ? value.substring(0, length - 3) + '...' : value;
};

export default cutStringHelper;
