import type { Meta, StoryObj } from '@storybook/react';
import ProductDetail from './ProductDetail';
import ThemeProvider from '../../../../shared/providers/ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../../../../shared/providers/LanguageProvider/LanguageProvider';
import React from 'react';

const meta: Meta<typeof ProductDetail> = {
  title: 'Entities/ProductDetail',
  component: ProductDetail,
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    categoryName: { control: 'text' },
    desc: { control: 'text' },
    name: { control: 'text' },
    price: { control: 'number' },
    photo: { control: 'text' },
  },
  decorators: [
    (story) => (
      <ThemeProvider>
        <LanguageProvider>{story()}</LanguageProvider>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OrdinaryProductDetail: Story = {
  args: {
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nostra vehicula ultricies, lobortis ornare dapibus montes vel fermentum sed dui.',
    name: 'Lorem ipsum',
    categoryName: 'Lorem ipsum categoty',
    price: 19.95,
    photo: 'https://via.placeholder.com/500.png?text=Lorem+ipsum+1',
  },
};

export const MissingPhotoProductDetail: Story = {
  args: {
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nostra vehicula ultricies, lobortis ornare dapibus montes vel fermentum sed dui.',
    categoryName: 'Lorem ipsum categoty',
    name: 'Lorem ipsum',
    price: 19.95,
    photo: 'https://wrong.com/miss.png',
  },
};

export const OnePhotoProductDetail: Story = {
  args: {
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nostra vehicula ultricies, lobortis ornare dapibus montes vel fermentum sed dui.',
    categoryName: 'Lorem ipsum categoty',
    name: 'Lorem ipsum',
    price: 19.95,
    photo: 'https://via.placeholder.com/500.png?text=Lorem+ipsum',
  },
};

export const MisingDescriptionProductDetail: Story = {
  args: {
    name: 'Lorem ipsum',
    categoryName: 'Lorem ipsum categoty',
    price: 19.95,
    photo: 'https://via.placeholder.com/500.png?text=Lorem+ipsum+1',
  },
};
