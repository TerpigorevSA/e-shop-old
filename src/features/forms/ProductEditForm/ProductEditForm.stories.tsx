import React, { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProductEditForm from './ProductEditForm';
import '../../../app/localization';
import ThemeProvider from '../../../shared/providers/ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../../../shared/providers/LanguageProvider/LanguageProvider';

const pageStyle: CSSProperties = {
  textAlign: 'left' as const, // Приведение к конкретному типу
  color: 'var(--text-color)',
  backgroundColor: 'var(--background-color)',
  borderColor: 'var(--border-color)',
  padding: '20px',
};

const meta: Meta<typeof ProductEditForm> = {
  title: 'Forms/ProductEditForm',
  component: ProductEditForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (story) => (
      <ThemeProvider>
        <LanguageProvider>
          <div style={pageStyle}>{story()}</div>
        </LanguageProvider>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleProductEditForm: Story = {
  args: {
    onSubmit: (data: any) => console.log(data),
  },
};
