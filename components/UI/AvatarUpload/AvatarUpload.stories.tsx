import type { Meta, StoryObj } from '@storybook/react';
import AvatarUpload from '@/components/UI/AvatarUpload';

const meta: Meta<typeof AvatarUpload> = {
  title: 'UI/AvatarUpload',
  component: AvatarUpload,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AvatarUpload>;

export const Default: Story = {
  args: {
    id: 'avatar',
    name: 'avatar',
    onChange: () => {},
    placeholder: '',
    src: '',
    errors: null,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    errors: 'The avatar is required',
  },
  render: (args) => <AvatarUpload {...args} />,
};

export const HasAvatar: Story = {
  args: {
    ...Default.args,
    src: 'https://avatars.githubusercontent.com/u/1234567?v=4',
  },
  render: (args) => <AvatarUpload {...args} />,
};

export const WithCustomPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Upload avatar',
  },
  render: (args) => <AvatarUpload {...args} />,
};
