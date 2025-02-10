/* eslint-disable no-console */
import Hero from '@/components/UI/Hero';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Hero> = {
  title: 'UI/Hero',
  component: Hero,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    title: 'Guiding the next generation of devs!',
    action: {
      title: 'Join the community',
      handler: () => console.log('Action clicked'),
    },
  },

  render: (args) => <Hero {...args} />,
};

export const WithLogo: Story = {
  args: {
    title: 'Guiding the next generation of devs!',
    action: {
      title: 'Join the community',
      handler: () => console.log('Action clicked'),
    },
    logo: 'https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg',
  },

  render: (args) => <Hero {...args} />,
};

export const LoggedIn: Story = {
  args: {
    title: 'Get Started',
    action: {
      title: 'Post a Job',
      handler: () => console.log('Action clicked'),
    },
    user: {
      id: '1',
    },
  },

  render: (args) => <Hero {...args} />,
};

export const LoggedInWithLogo: Story = {
  args: {
    title: 'Get Started',
    action: {
      title: 'Post a Job',
      handler: () => console.log('Action clicked'),
    },
    user: {
      id: '1',
    },
    logo: 'https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg',
  },

  render: (args) => <Hero {...args} />,
};
