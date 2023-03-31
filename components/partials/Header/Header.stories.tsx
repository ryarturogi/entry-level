import type { Meta, StoryObj } from '@storybook/react';
import Header from '@/components/partials/Header';
import logo from '@/stories/assets/logo.svg';

const meta: Meta<typeof Header> = {
  title: 'Partials/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    user: null,
    logo,
  },
};

export const LoggedIn: Story = {
  args: {
    user: {
      id: '123',
      role: 'candidate',
      name: 'John Doe',
      avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    logo,
  },
};

export const LoggedInWithoutAvatar: Story = {
  args: {
    ...LoggedIn.args,
    user: {
      ...LoggedIn.args.user,
      avatar: '',
    },
  },
};

export const LoggedInAsCompany: Story = {
  args: {
    ...LoggedIn.args,
    user: {
      ...LoggedIn.args.user,
      role: 'company',
    },
  },
};
