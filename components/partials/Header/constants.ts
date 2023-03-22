import { MenuItemProps } from './types';

export const UPLOAD_IMAGE_PATH: string = process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_IMAGE_PATH;

export const Navigation: MenuItemProps[] = [
  {
    label: 'Profile',
    href: '/profile',
  },
];
