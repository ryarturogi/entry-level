import HeadingTitle from '@/components/UI/HeadingTitle';
import type { Meta, StoryObj } from '@storybook/react';
import { ALL_SIZES } from '@/components/UI/HeadingTitle/constants';

const meta: Meta<typeof HeadingTitle> = {
  title: 'UI/HeadingTitle',
  component: HeadingTitle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Size of the heading',
      defaultValue: 'lg',
      options: ALL_SIZES,
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeadingTitle>;

export const Default: Story = {
  render: (args) => <HeadingTitle {...args}>Heading Title</HeadingTitle>,
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      {ALL_SIZES.map((size: any) => (
        <HeadingTitle key={size} size={size} {...args}>
          Heading Title = {size}
        </HeadingTitle>
      ))}
    </div>
  ),
};
