import type { Meta, StoryObj } from '@storybook/react';
import Footer from '@/components/partials/Footer';

const meta: Meta<typeof Footer> = {
  title: 'Partials/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const FooterLight: Story = {};
