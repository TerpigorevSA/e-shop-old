import type { Meta, StoryObj } from '@storybook/react';
import { Header_exmpl } from './Header_exmpl';

const meta: Meta<typeof Header_exmpl> = {
  title: 'Example/Header_exmpl',
  component: Header_exmpl,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};
