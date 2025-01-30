import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AuthScreen, { AuthAction } from './AuthScreen';
import '../../app/localization';
import ThemeProvider from '../../shared/providers/ThemeProvider/ThemeProvider';
import { LanguageProvider } from '../../shared/providers/LanguageProvider/LanguageProvider';

const meta: Meta<typeof AuthScreen> = {
  title: 'Pages/AuthScreen',
  component: AuthScreen,
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

export const SignInAuthScreen: Story = {
  args: {
    authAction: AuthAction.SignIn,
  },
};

export const SignUpAuthScreen: Story = {
  args: {
    authAction: AuthAction.SignUp,
  },
};
