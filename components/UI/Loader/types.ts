export interface LoaderProps {
  text?: string;
  size?: number;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'gray'
    | 'transparent';
  className?: string;
}
