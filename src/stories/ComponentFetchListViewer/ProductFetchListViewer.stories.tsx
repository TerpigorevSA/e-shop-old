import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import ProductFetchListViewer from './ProductFetchListViewer';
import '../../app/localization';
import ThemeProvider from '../../shared/providers/ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../../shared/providers/LanguageProvider/LanguageProvider';

const meta: Meta<typeof ProductFetchListViewer> = {
  title: 'Shared/ComponentFetchListViewer/Product',
  component: ProductFetchListViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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

export const SimpleProductFetchListViewer: Story = {};
