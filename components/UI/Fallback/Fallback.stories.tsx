import type { Meta, StoryObj } from '@storybook/react';
import Fallback from '@/components/UI/Fallback';
import { SIZES_MAP, VARIANTS_MAP } from '@/components/UI/Fallback/constants';

const meta: Meta<typeof Fallback> = {
  title: 'UI/Fallback',
  component: Fallback,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Size of the loader',
      defaultValue: 'sm',
      control: {
        type: 'select',
      },
      options: Object.keys(SIZES_MAP),
    },
    variant: {
      description: 'Color variant of the loader',
      defaultValue: 'primary',
      control: {
        type: 'select',
      },
      options: Object.keys(VARIANTS_MAP),
    },
  },
};

export default meta;

type Story = StoryObj<typeof Fallback>;

export const Default: Story = {
  args: {
    message: 'Loading...',
  },
};

export const WithCustomLoadingText: Story = {
  args: {
    message: 'Custom loading text',
  },
};

export const Variants: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      {Object.keys(VARIANTS_MAP).map((variant: any) => (
        <Fallback key={variant} variant={variant} {...args} />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    ...Default.args,
  },
  render: (args) => (
    <div className="flex flex-col gap-2">
      {Object.keys(SIZES_MAP).map((size: any) => (
        <Fallback key={size} size={size} {...args} />
      ))}
    </div>
  ),
};

export const WithoutMessage: Story = {
  args: {
    message: null,
  },
};
