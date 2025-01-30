import { v4 as uuidv4 } from 'uuid';
import { Category, Product } from '../../types/serverTypes';
import { Operation } from '../../../entities/Operation/models/types/operation';

export const createRandomProduct = (createdAt: string): Product => {
  const id = getRandomId();
  const category = getRandomCategory();
  const price = getRandom(10, 1000, 2);

  return {
    id: id,
    name: `Продукт ${id}`,
    // photos: [`https://dummyimage.com/500x500/cccccc/000000&text=Lorem+ipsum+${id}`],
    photo: `https://via.placeholder.com/500.png?text=Lorem+ipsum+${id}`,
    // photo: `store/photos/products/${id}.jpeg`,
    // createdAt: createdAt,
    createdAt: null,
    updatedAt: null,
    commandId: null,
    category: category,
    price: price,
    oldPrice: Math.random() < 0.5 ? price + Math.trunc(100 * price * getRandom(-0.2, 0.2, 2)) / 100 : undefined,
    desc: Math.random() < 0.5 ? `Это ${category.name.toLowerCase()}.` : undefined,
  };
};

export const createRandomOperation = (createdAt: string): Operation => {
  const id = getRandomId();
  const category = getRandomCategory();
  const type = Math.random() < 0.5 ? 'Cost' : 'Profit';
  return {
    id: id,
    name: `Операция ${id}`,
    createdAt: createdAt,
    category: category,
    amount: getRandom(10, 1000, 2) * (type === 'Cost' ? -1 : 1),
    desc: Math.random() < 0.5 ? `Операция ${type} id(${id}).` : undefined,
    type: type,
  };
};

export const getRandomId = (): string => {
  return uuidv4();
};

export const getRandomDate = (start: Date, end: Date) => {
  const date = new Date(+start + Math.random() * (end.getTime() - start.getTime()));
  const hour = Math.floor(Math.random() * 24);
  const minute = hour === 0 ? 1 : Math.floor(Math.random() * 60);
  date.setHours(hour);
  date.setMinutes(minute);
  return date.toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const getRandom = (min: number, max: number, digits: number): number => {
  return Math.round((min + Math.random() * (max - min)) * 10 ** digits) / 10 ** digits;
};

export const categories: Category[] = [
  {
    id: '1',
    name: 'Прям вот очень нужное',
    commandId: '6d4672bc-6245-4b6b-a4c4-acdb6cf3fc89',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Не так, что бы нужное',
    photo: 'store/photos/categories/2.jpeg',
    commandId: '6d4672bc-6245-4b6b-a4c4-acdb6cf3fc89',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Совсем выбрось',
    photo: 'store/photos/categories/3.jpeg',
    commandId: '6d4672bc-6245-4b6b-a4c4-acdb6cf3fc89',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Необходимое',
    commandId: '6d4672bc-6245-4b6b-a4c4-acdb6cf3fc89',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Вроде некуда, а жаль',
    commandId: '6d4672bc-6245-4b6b-a4c4-acdb6cf3fc89',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const getRandomCategory = (): Category => {
  return categories[Math.trunc(Math.random() * categories.length)];
};

export const getCategories = (): Category[] => {
  return categories;
};

export const getAuth = (): string => {
  return uuidv4();
};
