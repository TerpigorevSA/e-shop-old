import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import cn from 'clsx';
import style from '../../../features/Cart/ui/CartButton/CartButton.module.css';
import '../../../app/App.css';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {},
  decorators: [(story) => <div style={{ height: '30px', width: '100px' }}>{story()}</div>],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyClassName: Story = {
  args: {
    lable: 'shared button',
    className: '',
    disabled: false,
  },
};

export const ColorInClassName: Story = {
  args: {
    lable: 'shared button',
    className: cn(style.button),
    disabled: false,
  },
};

export const EmptyClassNameDisabled: Story = {
  args: {
    lable: 'shared button',
    className: '',
    disabled: true,
  },
};

export const ColorInClassNameDisabled: Story = {
  args: {
    lable: 'shared button',
    className: cn(style.button),
    disabled: true,
  },
};
