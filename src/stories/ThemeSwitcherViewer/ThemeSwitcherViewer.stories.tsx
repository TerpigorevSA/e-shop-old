import type { Meta, StoryObj } from '@storybook/react';
import ThemeSwitcherViewer from './ThemeSwitcherViewer';

const meta: Meta<typeof ThemeSwitcherViewer> = {
  title: 'Shared/ThemeSwitcherViewer',
  component: ThemeSwitcherViewer,
  tags: ['autodocs'],
  parameters: {
    // layout: 'fullscreen',
  },
  argTypes: {
    // text: { control: 'text', },
    // visible: { control: 'boolean', },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ThemeSwitcher: Story = {};
