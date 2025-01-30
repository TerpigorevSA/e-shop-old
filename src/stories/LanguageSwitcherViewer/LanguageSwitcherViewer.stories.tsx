import type { Meta, StoryObj } from '@storybook/react';
import LanguageSwitcherViewer from './LanguageSwitcherViewer';

const meta: Meta<typeof LanguageSwitcherViewer> = {
  title: 'Shared/LanguageSwitcherViewer',
  component: LanguageSwitcherViewer,
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

export const LanguageSwitcher: Story = {};
