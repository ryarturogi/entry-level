import Avatar from '@/components/UI/Avatar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    size: 'md',
    avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4',
  },
};

export const WithNoAvatar: Story = {
  args: {
    ...Default.args,
    avatar: '',
  },
  render: (args) => <Avatar {...args} />,
};

export const IsRounded: Story = {
  args: {
    ...Default.args,
    isRounded: true,
  },
  render: (args) => <Avatar {...args} />,
};
