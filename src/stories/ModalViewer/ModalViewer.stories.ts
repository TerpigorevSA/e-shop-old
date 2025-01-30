import type { Meta, StoryObj } from '@storybook/react';
import ModalViewer from './ModalViewer';

const meta: Meta<typeof ModalViewer> = {
  title: 'Shared/ModalViewer',
  component: ModalViewer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // text: { control: 'text', },
    // visible: { control: 'boolean', },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const VisibleModal: Story = {
  args: {
    // visible: true,
    text: 'Lorem ipsum dolor sit, amet consectetur. Sem viverra magna fusce mus torquent metus dictumst suspendisse lectus quis, laoreet natoque at tempus turpis orci maecenas egestas gravida sociis morbi, scelerisque tortor iaculis ante nunc a malesuada facilisis aptent. Pharetra integer senectus malesuada ridiculus sollicitudin fusce cum commodo purus rhoncus suscipit, diam nisi suspendisse dictumst litora quisque tellus duis vitae porta, sed cras scelerisque id praesent platea nam mollis phasellus non. Fusce molestie fringilla scelerisque ullamcorper justo auctor accumsan, quisque enim nibh vehicula aliquam.',
  },
};
