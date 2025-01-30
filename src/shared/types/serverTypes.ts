export enum ErrorCode {
  ERR_INCORRECT_EMAIL_OR_PASSWORD = 'ERR_INCORRECT_EMAIL_OR_PASSWORD', // Если не корректный email или пароль
  ERR_ACCOUNT_ALREADY_EXIST = 'ERR_ACCOUNT_ALREADY_EXIST', // При регистрации если пользователь уже существует
  ERR_FIELD_REQUIRED = 'ERR_FIELD_REQUIRED', // Обязательное поле. В ошибке будет дополнительное поле fieldName с указанием, какое конкретно поле обязательно
  ERR_INCORRECT_PASSWORD = 'ERR_INCORRECT_PASSWORD', // Некорректный старый пароль при попытке его изменить
  ERR_INVALID_PASSWORD = 'ERR_INVALID_PASSWORD', // Пароль не соответствует регулярному выражению /^[\w-@{}()#$%^&*+=!~]{8,}$/
  ERR_NOT_VALID = 'ERR_NOT_VALID', // Не валидный id сущности
  ERR_AUTH = 'ERR_AUTH', // Токен не передан, либо не прошел авторизацию
  ERR_NO_FILES = 'ERR_NO_FILES', // Ошибка при загрузке файлов
  ERR_NOT_ALLOWED = 'ERR_NOT_ALLOWED', // Нет доступа к данной операции (нельзя редактировать заказ другого пользователя)
  ERR_NOT_FOUND = 'ERR_NOT_FOUND', // Сущность не найдена
  ERR_VALIDATION_ERROR = 'ERR_VALIDATION_ERROR', // Не валидные данные, например, не указано name
  ERR_INVALID_QUERY_PARAMS = 'ERR_INVALID_QUERY_PARAMS', // Все GET запросы могут принимать данные запроса в search params в формате { [key: string]: string // Нужно использовать JSON.stringify() }

  ERR_INTERNAL_SERVER = 'ERR_INTERNAL_SERVER', // Серверная ошибка. Обратитесь ко мне, этой ошибки быть не должно
}

export type ServerErrors = {
  errors: {
    extensions: {
      code: ErrorCode;
    };

    name: string;
    fieldName?: string;
    stack: string;
    message: string;
  }[];
};

export type ServerError = ServerErrors['errors'] extends (infer T)[] ? T : undefined;

export type Profile = {
  id: string;
  name: string;
  email: string;
  signUpDate: unknown;
  commandId: string;
};

export type Category = {
  id: string;
  name: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};

export type Product = {
  id: string;
  name: string;
  photo?: string;
  desc?: string;
  createdAt: Date;
  updatedAt: Date;
  oldPrice?: number;
  price: number;
  commandId: string;
  category: Category;
};

export type User = Partial<Profile>;

export type Order = {
  id: string;
  products: OrderProduct[];
  user: User;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  commandId: string;
};

export type OrderProduct = {
  _id: string; // служебный id - это не id продукта
  product: Product;
  quantity: number;
};

export enum OrderStatus {
  PendingConfirmation = 'pending_confirmation',
  Processing = 'processing',
  Packaging = 'packaging',
  WaitingForDelivery = 'waiting_for_delivery',
  InTransit = 'in_transit',
  Delivered = 'delivered',
  ReturnRequested = 'return_requested',
  OrderCancelled = 'order_cancelled',
}

export type Pagination = {
  pageSize?: number;
  pageNumber?: number;
};

export type Sorting = {
  type: 'ASC' | 'DESC';
  field: 'id' | 'createdAt' | 'updatedAt' | 'name';
};

export type PaginationWithTotal = Pagination & {
  total: number;
};

export type GetPageResult<T> = {
  data: T[];
  pagination: PaginationWithTotal;
  sorting: Sorting;
};

export type DateInterval = {
  gte?: string; // от - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
  lte?: string; // до - дата в виде строки new Date().toISOString() 2023-09-19T10:37:16.389+00:00
};

export type CommonFilters = {
  pagination?: Pagination;
  createdAt?: DateInterval;
  updatedAt?: DateInterval;
  sorting?: Sorting;
};

export type Stringified<T> = {
  [K in keyof T]: T[K] extends object ? string : T[K];
};

export type ProductsFilters = CommonFilters & {
  name?: string;
  ids?: string[];
  categoryIds?: string[];
};

export type CategoriesFilters = CommonFilters & {
  name?: string;
  ids?: string[];
};

export type OrdersFilters = CommonFilters & {
  productIds?: string[];
  userId?: string;
  ids?: string[];
  status?: OrderStatus;
};

export type UserOrdersFilters = Omit<OrdersFilters, 'productIds' | 'ids' | 'status'>;

export type AuthResult = {
  token: string;
  profile: Profile;
};

export type SignUpBody = {
  email: string;
  password: string;
  commandId: string;
};

export type SignInBody = {
  email: string;
  password: string;
};

export type ChangePasswordBody = {
  password: string;
  newPassword: string;
};

export type ChangePasswordResult = {
  success: boolean;
};

export type UpdateProfileBody = {
  name: string;
};

export type MutateRequest<T> = {
  body: T;
  id: string;
};

export type MutateProductBody = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'commandId' | 'category'> & {
  categoryId: string;
};

export type MutateCategoryBody = Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'commandId'>;

export type MutateOrderProduct = {
  id: string;
  quantity: number;
};

export type MutateOrderBody = Omit<Order, 'id' | 'createdAt' | 'products' | 'user' | 'updatedAt' | 'commandId'> & {
  products: MutateOrderProduct[];
};

export type MutatePartProductBody = Partial<MutateProductBody>;

export type MutatePartCategoryBody = Partial<MutateCategoryBody>;

export type MutatePartOrderBody = Partial<MutateOrderBody>;
