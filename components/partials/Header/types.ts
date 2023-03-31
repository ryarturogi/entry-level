export type User = {
  id: string | number;
  role: string;
  name: string;
  avatar: string;
};
export interface NavigationItemProps {
  pathname: string;
  name: string;
}

export interface MenuItemProps {
  label: string;
  href: string;
}

export interface MenuLoggedInProps {
  avatar: string;
  user: User;
}
