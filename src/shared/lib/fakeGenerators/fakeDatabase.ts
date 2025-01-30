import { Category, Product } from '../../types/serverTypes';
import { createRandomProduct, getCategories, getRandomDate } from './fakeGenerators';

const fakeDatabase = {
  users: new Map<
    string,
    { id: string; username: string; password: string; email: string; about: string; isAdmin: boolean; token: string }
  >(),
  tokens: new Set<string>(),
  categories: new Map<string, Category>(),
  products: new Map<string, Product>(),
};

fakeDatabase.users.set('e4757c52-20a3-47cf-8b0c-f9a6903e1926', {
  id: 'e4757c52-20a3-47cf-8b0c-f9a6903e1926',
  email: 'user1@example.com',
  username: 'user1',
  about: 'About user1',
  password: 'password1',
  token: 'bcfd6af1-d2c6-4772-8f61-3bb9adb6c49c',
  isAdmin: true,
});
fakeDatabase.tokens.add('bcfd6af1-d2c6-4772-8f61-3bb9adb6c49c');

fakeDatabase.users.set('064af3b3-0b37-4dda-a090-ba118ca1dd65', {
  id: '064af3b3-0b37-4dda-a090-ba118ca1dd65',
  email: 'user2@example.com',
  username: 'user2',
  about: 'About user2',
  password: 'password2',
  token: '8e3318c0-b976-4d80-9d8f-774416f333ba',
  isAdmin: false,
});
fakeDatabase.tokens.add('8e3318c0-b976-4d80-9d8f-774416f333ba');

getCategories().forEach((category) => fakeDatabase.categories.set(category.id, category));
Array.from({ length: 50 }).forEach(() => {
  const product = createRandomProduct(getRandomDate(new Date('2022-01-01'), new Date('2022-12-31')));
  fakeDatabase.products.set(product.id, product);
});

export default fakeDatabase;
