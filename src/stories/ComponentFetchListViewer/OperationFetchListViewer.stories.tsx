import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import OperationFetchListViewer from './OperationFetchListViewer';
import '../../app/localization';
import ThemeProvider from '../../shared/providers/ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../../shared/providers/LanguageProvider/LanguageProvider';

const meta: Meta<typeof OperationFetchListViewer> = {
  title: 'Shared/ComponentFetchListViewer/Operation',
  component: OperationFetchListViewer,
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

export const SimpleOperationFetchListViewer: Story = {};
