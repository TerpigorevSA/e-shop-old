import type { Meta, StoryObj } from '@storybook/react';
import OperationDetail from './OperationDetail';
import ThemeProvider from '../../../../shared/providers/ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../../../../shared/providers/LanguageProvider/LanguageProvider';
import React from 'react';

const meta: Meta<typeof OperationDetail> = {
  title: 'Entities/OperationDetail',
  component: OperationDetail,
  tags: ['autodocs'],
  parameters: {},
  argTypes: {
    amount: { control: 'number' },
    categoryName: { control: 'text' },
    desc: { control: 'text' },
    name: { control: 'text' },
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

export const OrdinaryOperationDetail: Story = {
  args: {
    createdAt: '01.01.1900 00:00:01',
    amount: 19.95,
    categoryName: 'Category Lorem ipsum dolor sit amet consectetur adipiscing elit nostra.',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nostra vehicula ultricies, lobortis ornare dapibus montes vel fermentum sed dui.',
    name: 'Lorem ipsum',
  },
};

export const MissingDescriptoinOperationDetail: Story = {
  args: {
    createdAt: '01.01.1900 00:00:01',
    amount: 19.95,
    categoryName: 'Category Lorem ipsum dolor sit amet consectetur adipiscing elit nostra.',
    name: 'Lorem ipsum',
  },
};
