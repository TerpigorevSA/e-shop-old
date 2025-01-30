import type { Meta, StoryObj } from '@storybook/react';
import CropText from './CropText';
import React from 'react';

const meta: Meta<typeof CropText> = {
  title: 'Shared/CropText',
  component: CropText,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    crop: { control: 'boolean' },
    text: { control: 'text' },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          resize: 'horizontal',
          overflow: 'auto',
          border: '1px dashed gray',
          padding: '10px',
          maxWidth: '100%',
          minWidth: '100px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const VisibleCropText: Story = {
  args: {
    crop: true,
    text: 'Lorem ipsum dolor sit, amet consectetur. Sem viverra magna fusce mus torquent metus dictumst suspendisse lectus quis, laoreet natoque at tempus turpis orci maecenas egestas gravida sociis morbi, scelerisque tortor iaculis ante nunc a malesuada facilisis aptent. Pharetra integer senectus malesuada ridiculus sollicitudin fusce cum commodo purus rhoncus suscipit, diam nisi suspendisse dictumst litora quisque tellus duis vitae porta, sed cras scelerisque id praesent platea nam mollis phasellus non. Fusce molestie fringilla scelerisque ullamcorper justo auctor accumsan, quisque enim nibh vehicula aliquam.',
  },
};
