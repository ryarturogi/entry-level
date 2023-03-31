import MenuLoggedIn from './MenuLoggedIn';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MenuLoggedIn> = {
  title: 'Partials/Header/MenuLoggedIn',
  component: MenuLoggedIn,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="w-56 py-2">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MenuLoggedIn>;

export const Default: Story = {
  args: {
    user: {
      id: '123',
      role: 'candidate',
      name: 'John Doe',
      avatar: null,
    },
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
  },
};

export const LoggedInAsCompany: Story = {
  args: {
    ...LoggedIn.args,
    user: { ...LoggedIn.args.user, role: 'company' },
  },
};
