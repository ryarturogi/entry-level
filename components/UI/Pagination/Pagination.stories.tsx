import Pagination from '@/components/UI/Pagination';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    offset: {
      description: 'Current offset',
      defaultValue: 0,
      control: {
        type: 'number',
      },
    },
    limit: {
      description: 'Current limit',
      defaultValue: 10,
      control: {
        type: 'number',
      },
    },
    totalCount: {
      description: 'Total count of items',
      defaultValue: 100,
      control: {
        type: 'number',
      },
    },
    loading: {
      description: 'Loading state',
      defaultValue: false,
      control: {
        type: 'boolean',
      },
    },
    error: {
      description: 'Error state',
      defaultValue: null,
      control: {
        type: 'text',
      },
    },
    handlePageChange: {
      description: 'Callback for page change',
      defaultValue: (offset: number, limit?: number) => {
        console.log(offset, limit);
      },
    },
    handleLimitChange: {
      description: 'Callback for limit change',
      defaultValue: (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event);
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    offset: 0,
    limit: 10,
    error: null,
    handlePageChange: (offset: number, limit?: number) => {
      return null;
    },
    handleLimitChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
      return null;
    },
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: 'Something went wrong',
  },
};

export const WithOffset: Story = {
  args: {
    ...Default.args,
    offset: 10,
  },
};

export const WithLimit: Story = {
  args: {
    ...Default.args,
    limit: 20,
  },
};
