/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 **/

type Category = {
  id: string;
  name: string;
  photo?: string;
};

/** Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 **/

type Product = {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  category: Category;
  price: number;
  oldPrice?: number;
};

/** Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 *
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 *
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */

type BaseOperation = {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  category: Category;
  amount: number;
};

type Cost = BaseOperation & {
  type: 'Cost';
};

type Profit = BaseOperation & {
  type: 'Profit';
};

type Operation = Cost | Profit;

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => {
  const id = getRandomId();
  const category = getRandomCategory();
  const price = getRandom(10, 1000, 2);

  return {
    id: id,
    name: `Продукт ${id}`,
    photo: `store/photos/products/${id}.jpeg`,
    createdAt: createdAt,
    category: category,
    price: price,
    oldPrice: Math.random() < 0.5 ? price + Math.trunc(100 * price * getRandom(-0.2, 0.2, 2)) / 100 : undefined,
    desc: Math.random() < 0.5 ? `Это ${category.name.toLowerCase()}.` : undefined,
  };
};

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  const id = getRandomId();
  const category = getRandomCategory();
  const type = Math.random() < 0.5 ? 'Cost' : 'Profit';
  return {
    id: id,
    name: `Операция ${id}`,
    createdAt: createdAt,
    category: category,
    amount: getRandom(10, 1000, 2),
    desc: Math.random() < 0.5 ? `Операция ${type} id(${id}).` : undefined,
    type: type,
  };
};

const getRandomId = (): string => {
  return getRandom(1, 1000000, 0).toString();
};

const getRandom = (min: number, max: number, digits: number): number => {
  return Math.round((min + Math.random() * (max - min)) * 10 ** digits) / 10 ** digits;
};

const getRandomCategory = (): Category => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Прям вот очень нужное',
    },
    {
      id: '2',
      name: 'Не так, что бы нужное',
      photo: 'store/photos/categories/2.jpeg',
    },
    {
      id: '3',
      name: 'Совсем выбрось',
      photo: 'store/photos/categories/3.jpeg',
    },
    {
      id: '4',
      name: 'Необходимое',
    },
    {
      id: '5',
      name: 'Вроде некуда, а жаль',
    },
  ];

  return categories[Math.trunc(Math.random() * categories.length)];
};
