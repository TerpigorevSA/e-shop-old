type AddPropertyPrefix<Type, Prefix extends string> = {
  [Property in keyof Type as `${Prefix}${Capitalize<string & Property>}`]: Type[Property];
};

type MutatePropertyToArray<Type> = {
  [Property in keyof Type as `${Uncapitalize<string & Property>}s`]: Type[Property][];
};
