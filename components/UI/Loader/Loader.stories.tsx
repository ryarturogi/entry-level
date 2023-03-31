import Loader from '@/components/UI/Loader';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Loader> = {
  title: 'UI/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Size of the loader',
      defaultValue: 'md',
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      description: 'Color variant of the loader',
      defaultValue: 'primary',
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {
    text: 'Loading...',
  },
};

export const Variants: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <div className="flex items-center gap-4 bg-white">
      {['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark'].map(
        (variant: any) => (
          <Loader key={variant} variant={variant} {...args} />
        )
      )}
    </div>
  ),
};

export const DifferentMessage: Story = {
  args: {
    ...Default.args,
    text: 'Is loading now...',
  },
};
