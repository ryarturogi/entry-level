import type { Meta, StoryObj } from '@storybook/react';
import Header from '@/components/partials/Header';
import logo from './assets/logo.svg';

const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/react/writing-docs/docs-page
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  args: {
    user: {
      id: '123',
      role: 'candidate',
      full_name: 'John Doe',
      avatar_url: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    },
    logo,
  },
};

export const LoggedInWithNoAvatar: Story = {
  args: {
    ...LoggedIn.args,
    user: {
      ...LoggedIn.args.user,
      avatar_url: null,
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

export const LoggedOut: Story = {
  args: {
    user: null,
    logo,
  },
};
