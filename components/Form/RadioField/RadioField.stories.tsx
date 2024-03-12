import RadioField from '@/components/Form/RadioField';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Form/RadioField',
  component: RadioField,
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Options',
      options: [
        {
          name: 'Option 1',
          id: 'option1',
        },
        {
          name: 'Option 2',
          id: 'option2',
        },
        {
          name: 'Option 3',
          id: 'option3',
        },
      ],
      control: { type: 'object' },
    },
    optionSelected: {
      description: 'Selected option',
      defaultValue: 'option1',
      control: {
        type: 'radio',
      },
      options: ['option1', 'option2', 'option3'],
    },
    variant: {
      description: 'Color variant',
      defaultValue: 'primary',
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'light', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadioField>;

export const Default: Story = {
  args: {
    options: [
      {
        name: 'Option 1',
        id: 'option1',
      },
      {
        name: 'Option 2',
        id: 'option2',
      },
      {
        name: 'Option 3',
        id: 'option3',
      },
    ],
    optionSelected: 'option1',
    title: 'Radio Field',
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    optionSelected: 'option2',
  },
};

export const Variant: Story = {
  args: {
    ...Default.args,
    variant: 'error',
  },
};
