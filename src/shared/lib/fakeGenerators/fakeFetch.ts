import fakeDatabase from './fakeDatabase';
import { getRandomId } from './fakeGenerators';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let indProducts = 0;
const productsPageSize = 10;

export const fetch = async (url: string, options: RequestInit) => {
  await delay(500);

  const { method, body, headers } = options;
  const data = body ? JSON.parse(body.toString()) : ({} as any);
  const token = new Headers(headers).get('Authorization')?.replace('Bearer ', '');

  if (url.endsWith('/signin') && method === 'POST') {
    const user = [...fakeDatabase.users.values()].find((u) => u.email === data.email && u.password === data.password);

    if (!user) {
      return { ok: false, status: 401, json: async () => ({ message: 'Invalid credentials' }) };
    }

    fakeDatabase.tokens.add(user.token);
    return {
      ok: true,
      status: 200,
      json: async () => ({
        token: user.token,
      }),
    };
  }

  if (url.endsWith('/signup') && method === 'POST') {
    const existingUser = [...fakeDatabase.users.values()].find((u) => u.email === data.email);

    if (existingUser) {
      return { ok: false, status: 409, json: async () => ({ message: 'User already exists' }) };
    }

    const newUser = {
      id: getRandomId(),
      username: data.username,
      password: data.password,
      email: data.email,
      about: data.about,
      token: getRandomId(),
      isAdmin: false,
    };

    fakeDatabase.users.set(newUser.id, newUser);
    fakeDatabase.tokens.add(newUser.token);

    return {
      ok: true,
      status: 201,
      json: async () => ({
        token: newUser.token,
      }),
    };
  }

  if (url.endsWith('/signout') && method === 'POST') {
    const token = data.token;
    fakeDatabase.tokens.delete(token);
    return { ok: true, status: 200, json: async () => ({} as any) };
  }

  if (url.startsWith('/api/users/byToken') && method === 'GET') {
    if (token && !fakeDatabase.tokens.has(token)) {
      return { ok: false, status: 401, json: async () => ({ message: 'Unauthorized' }) };
    }
    const requestedToken = url.split('/').pop();
    const user = [...fakeDatabase.users.values()].find((u) => u.token === requestedToken);
    if (!user) {
      return { ok: false, status: 404, json: async () => ({ message: 'User not found' }) };
    }
    return {
      json: async () => ({
        user: { id: user.id, email: user.email, name: user.username, about: user.about, isAdmin: user.isAdmin },
        token: user.token,
      }),
      ok: true,
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    };
  }

  if (url === '/api/profile' && method === 'GET') {
    if (token && !fakeDatabase.tokens.has(token)) {
      return { ok: false, status: 401, json: async () => ({ message: 'Unauthorized' }) };
    }
    const user = [...fakeDatabase.users.values()].find((u) => u.token === token);
    if (!user) {
      return { ok: false, status: 404, json: async () => ({ message: 'User not found' }) };
    }
    return {
      json: async () => ({
        id: user.id,
        email: user.email,
        name: user.username,
        about: user.about,
        isAdmin: user.isAdmin,
      }),
      ok: true,
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    };
  }

  if (url === '/api/profile' && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    if (token && !fakeDatabase.tokens.has(token)) {
      return { ok: false, status: 401, json: async () => ({ message: 'Unauthorized' }) };
    }
    const userData = JSON.parse(body as string);
    const user = [...fakeDatabase.users.values()].find((u) => u.token === token);
    if (!user) {
      return { ok: false, status: 404, json: async () => ({ message: 'User not found' }) };
    }
    fakeDatabase.users.set(user.id, { ...user, ...userData });

    return {
      json: async () => fakeDatabase.users.get(user.id),
      ok: true,
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    };
  }

  if (url === '/api/users/chngePassword' && method === 'POST') {
    if (token && !fakeDatabase.tokens.has(token)) {
      return { ok: false, status: 401, json: async () => ({ message: 'Unauthorized' }) };
    }
    const { oldPassword, newPassword, email } = JSON.parse(body as string);
    const user = [...fakeDatabase.users.values()].find((u) => u.email === email);
    if (!user) {
      return { ok: false, status: 404, json: async () => ({ message: 'User not found' }) };
    }
    if (user.password !== oldPassword) {
      return { ok: false, status: 400, json: async () => ({ message: 'Incorrect password' }) };
    }
    user.password = newPassword;
    return {
      json: async () => ({ message: 'Password updated successfully' }),
      ok: true,
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    };
  }

  if (url.endsWith('/products/get') && method === 'GET') {
    if (token && !fakeDatabase.tokens.has(token)) {
      return { ok: false, status: 401, json: async () => ({ message: 'Unauthorized' }) };
    }

    const products = [...fakeDatabase.products.values()].slice(indProducts, indProducts + productsPageSize);
    if (indProducts < fakeDatabase.products.size) indProducts += productsPageSize;

    if (!products) {
      return { ok: false, status: 404, json: async () => ({ message: 'Products not found' }) };
    }
    return {
      json: async () => ({
        products: products,
      }),
      ok: true,
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    };
  }

  if (url === '/api/products/update' && method === 'POST') {
    if (token && !fakeDatabase.tokens.has(token)) {
      return { ok: false, status: 401, json: async () => ({ message: 'Unauthorized' }) };
    }
    const productData = JSON.parse(body as string);

    const product = fakeDatabase.products.get(productData.id);
    if (!product) {
      return { ok: false, status: 404, json: async () => ({ message: 'Product not found' }) };
    }

    fakeDatabase.products.set(productData.id, { ...product, ...productData.updatedProduct });
    return {
      json: async () => ({
        product: fakeDatabase.products.get(productData.id),
      }),
      ok: true,
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    };
  }

  if (url.endsWith('/products/getCategories') && method === 'GET') {
    if (token && !fakeDatabase.tokens.has(token)) {
      return { ok: false, status: 401, json: async () => ({ message: 'Unauthorized' }) };
    }

    const categories = [...fakeDatabase.categories.values()];

    if (!categories) {
      return { ok: false, status: 404, json: async () => ({ message: 'Categories not found' }) };
    }
    return {
      json: async () => ({
        categories: categories,
      }),
      ok: true,
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    };
  }

  return { ok: false, status: 404, json: async () => ({ message: 'Not found' }) };
};
