import React from 'react';
import Link from 'next/link';
import { MenuNotLoggedInProps } from './types';

const MenuNotLoggedIn: React.FC<MenuNotLoggedInProps> = (
  props: MenuNotLoggedInProps
): React.ReactElement => {
  const { classes = '' } = props;

  return (
    <Link
      className={`px-3 py-2 text-sm font-medium text-gray-800 transition-all duration-100 ease-linear rounded hover:bg-primary-700 hover:text-white  ${classes}`}
      href="/login"
    >
      <span>Login</span>
    </Link>
  );
};

export default MenuNotLoggedIn;
