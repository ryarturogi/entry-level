export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  disabled?: boolean;
  displayType?: string;
  fullWidth?: boolean;
  id?: string;
  loading?: boolean;
  loadingText?: string;
  rounded?: string;
  size?: string;
  styles?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}
