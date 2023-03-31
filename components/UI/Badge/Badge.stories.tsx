import Badge from '@/components/UI/Badge';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'white',
        'dark',
        'disabled',
        'transparent',
        'gray',
        'link',
      ],
    },
    rounded: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    size: 'sm',
    variant: 'primary',
    rounded: 'sm',
  },
};

export const Variants: Story = {
  render: () => {
    const variants = [
      'primary',
      'secondary',
      'danger',
      'warning',
      'info',
      'success',
      'white',
      'dark',
    ];

    return (
      <section className="flex gap-2">
        {variants.map((variant: any) => (
          <Badge key={variant} {...Default.args} variant={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Badge>
        ))}
      </section>
    );
  },
};
