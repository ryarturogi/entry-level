export interface NavigationItem {
  pathname: string;
  name: string;
}

export interface MenuItemProps {
  label: string;
  href: string;
}

export type NewNavigationItem = {
  label: string;
  href: string;
};

export interface MenuNotLoggedInProps {
  classes?: string;
}
