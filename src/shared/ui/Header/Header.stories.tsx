import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import ThemeProvider from '../../providers/ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../../providers/LanguageProvider/LanguageProvider';
import '../../../app/localization';

const meta: Meta<typeof Header> = {
  title: 'Features/Header',
  component: Header,
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

export const SimpleHeader: Story = {};
