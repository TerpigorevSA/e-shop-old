export enum UserType {
  Standard = 'Standard',
  Premium = 'Premium',
  Gold = 'Gold',
  Free = 'Free',
}

export enum ProductType {
  Car = 'Car',
  Toy = 'Toy',
  Food = 'Food',
}

export interface Discount {
  general: number; // Общая скидка для типа пользователя
  productSpecific: Partial<Record<ProductType, number>>; // Скидки для определенных типов товаров
}

export interface Discounts {
  discounts: Record<UserType, Discount>;
}

export interface AccountServiceInterface {
  setGeneralDiscount(userType: UserType, discount: number): Discounts;
  setProductDiscount(userType: UserType, productType: ProductType, discount: number): Discounts;
  getFinalDiscount(userType: UserType, productType: ProductType): number;
}
