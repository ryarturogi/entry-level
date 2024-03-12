/* eslint-disable no-console */
import TextareaField from '@/components/Form/Textarea';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Form/Textarea',
  component: TextareaField,
  tags: ['autodocs'],
  argTypes: {
    //   label?: string;
    // name?: string;
    // error?: string;
    // onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    // onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    // success?: string;
    // value?: string;
    // required?: boolean;
    // rows?: number;
    label: {
      description: 'Label',
      defaultValue: 'Label',
      control: {
        type: 'text',
      },
    },
    name: {
      description: 'Name',
      defaultValue: 'name',
      control: {
        type: 'text',
      },
    },
    error: {
      description: 'Error',
      defaultValue: null,
      control: {
        type: 'object',
      },
    },
    onBlur: {
      description: 'On blur',
      defaultValue: (event: React.FocusEvent<HTMLTextAreaElement>) => {
        console.log(event);
      },
    },
    onChange: {
      description: 'On change',
      defaultValue: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(event);
      },
    },
    success: {
      description: 'Success',
      defaultValue: null,
      control: {
        type: 'object',
      },
    },
    value: {
      description: 'Value',
      defaultValue: '',
      control: {
        type: 'text',
      },
    },
    required: {
      description: 'Required',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    rows: {
      description: 'Rows',
      defaultValue: 3,
      control: {
        type: 'number',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextareaField>;

export const Default: Story = {
  args: {
    label: 'Textarea label',
    name: 'textarea',
    error: null,
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => {
      console.log(event);
    },
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      console.log(event);
    },
    success: null,
    value: '',
    required: false,
    rows: 3,
    placeholder: '',
  },
};

export const WithError: Story = {
  args: {
    label: 'Textarea label',
    name: 'textarea',
    error: 'Error message',
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => {
      console.log(event);
    },
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Textarea label',
    name: 'textarea',
    success: 'Success message',
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => {
      console.log(event);
    },
  },
};

export const WithValue: Story = {
  args: {
    label: 'Textarea label',
    name: 'textarea',
    value: 'Textarea value',
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => {
      console.log(event);
    },
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Textarea label',
    name: 'textarea',
    placeholder: 'Textarea placeholder text here',
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => {
      console.log(event);
    },
  },
};

export const WithRequired: Story = {
  args: {
    label: 'Textarea label',
    name: 'textarea',
    required: true,
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => {
      console.log(event);
    },
  },
};

export const WithRows: Story = {
  args: {
    label: 'Textarea label',
    name: 'textarea',
    rows: 5,
    placeholder: '5 rows of text here',
    onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => {
      console.log(event);
    },
  },
};
