import type { Meta, StoryObj } from '@storybook/react';
import { CogIcon } from '@heroicons/react/24/outline';

import Button from '@/components/UI/Button';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Button',
    color: 'primary',
    size: 'md',
    icon: '',
    iconSize: 'md',
    iconPosition: 'left',
    rounded: 'md',
    displayType: 'inline',
    children: 'Button',
    fullWidth: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    color: 'secondary',
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: 'sm',
  },
};

export const WithIcon: Story = {
  args: {
    ...Primary.args,
    icon: '🪲',
    iconPosition: 'right',
  },
};

export const WithIconLeft: Story = {
  args: {
    ...WithIcon.args,
    iconPosition: 'left',
  },
};
