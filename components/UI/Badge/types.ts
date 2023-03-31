export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'link'
    | 'disabled'
    | 'white'
    | 'gray'
    | 'dark'
    | 'transparent';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}
