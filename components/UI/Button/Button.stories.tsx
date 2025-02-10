import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
// import { userEvent, within } from '@storybook/testing-library';
// import { expect } from '@storybook/jest';

import Button from '@/components/UI/Button';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    rounded: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Variants: Story = {
  args: {
    size: 'sm',
    rounded: 'md',
    fullWidth: false,
  },
  render: (args) => (
    <section className="flex gap-2">
      <Button color="primary" title="Primary" {...args}>
        Primary
      </Button>
      <Button color="secondary" title="Secondary" {...args}>
        Secondary
      </Button>
      <Button color="success" title="Success" {...args}>
        Success
      </Button>
      <Button color="danger" title="Danger" {...args}>
        Danger
      </Button>
      <Button color="warning" title="Warning" {...args}>
        Warning
      </Button>
      <Button color="info" title="Info" {...args}>
        Info
      </Button>
      <Button color="white" title="White" {...args}>
        Light
      </Button>
      <Button color="dark" title="Dark" {...args}>
        Dark
      </Button>
      <Button color="disabled" title="disabled" {...args}>
        Disabled
      </Button>
    </section>
  ),
};

Variants.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/k8dCb6bIINvRIBjOzI687l/entryleveldevs?node-id=87-2179&t=I4wBj0hUF6P4HGOL-0',
  },
};

const ButtonWithHooks = (args: any) => {
  // Sets the hooks for both the label and primary props
  const [value, setValue] = useState('Secondary');

  // Sets a click handler to change the label's value
  const handleOnChange = () => {
    setValue(value === 'Primary' ? 'Secondary' : 'Primary');
  };
  return (
    <Button {...args} color={value} onClick={handleOnChange} title={value}>
      {value}
    </Button>
  );
};

export const WithHooks: Story = {
  render: (args) => <ButtonWithHooks {...args} />,
};

export const WithIcon: Story = {
  render: (args) => (
    <section className="flex gap-2">
      <Button {...args} color="primary" title="Primary">
        Primary
        <ArrowRightIcon className="w-4 h-4 ml-2" />
      </Button>
      <Button {...args} color="secondary" title="Secondary">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Secondary
      </Button>
    </section>
  ),
};
