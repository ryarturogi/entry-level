import Rating from '@/components/UI/Rating';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'UI/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    rating: {
      description: 'Current value',
      defaultValue: 0,
      control: {
        type: 'number',
      },
    },
    max: {
      description: 'Max value',
      defaultValue: 5,
      control: {
        type: 'number',
      },
    },
    onChange: {
      description: 'Callback for value change',
      defaultValue: (value: number) => {},
    },
  },
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    rating: 0,
  },
};

export const Full: Story = {
  args: {
    rating: 5,
  },
};

export const Variants: Story = {
  args: {
    ...Default.args,
    rating: 3,
  },
  render: (args) => (
    <div className="flex flex-col gap-4 bg-white">
      {['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark'].map(
        (variant: any) => (
          <Rating key={variant} variant={variant} {...args} />
        )
      )}
    </div>
  ),
};
