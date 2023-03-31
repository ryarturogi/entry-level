import CompanyLogo from '@/components/UI/CompanyLogo';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CompanyLogo> = {
  title: 'UI/CompanyLogo',
  component: CompanyLogo,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CompanyLogo>;

export const Default: Story = {
  args: {
    size: 'md',
    companyLogo: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    hasCompanyLogo: true,
    companySlug: 'company-slug',
  },
};

export const WithoutLogo: Story = {
  args: {
    ...Default.args,
    hasCompanyLogo: false,
    companySlug: 'company-slug',
  },
  render: (args) => <CompanyLogo {...args} />,
};
