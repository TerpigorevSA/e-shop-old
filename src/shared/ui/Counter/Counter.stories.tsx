import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Counter, { CounterProps } from './Counter';
import '../../../app/App.css';

const Template = (args: CounterProps) => {
  const [count, setCount] = useState(args.count);

  const onIncrement = () => setCount(count + 1);
  const onDecrement = () => setCount(count - 1);
  const onInputChange = (value: number) => setCount(value);

  return (
    <div style={{ height: '30px', width: '100px' }}>
      <Counter
        {...args}
        count={count}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onInputChange={onInputChange}
      />
    </div>
  );
};

const meta: Meta<typeof Template> = {
  title: 'Shared/Counter',
  component: Template,
  tags: ['autodocs'],
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleCounter: Story = {
  args: {
    count: 0,
    disabled: false,
  },
};

export const LimitedCounter = Template.bind({});
LimitedCounter.args = {
  count: 0,
  min: 0,
  max: 5,
  disabled: false,
};
