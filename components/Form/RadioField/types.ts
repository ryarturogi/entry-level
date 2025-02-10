export interface RadioFieldProps {
  options: { id: string; name: string }[];
  optionSelected: string;
  title: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark';
  onChange: (id: string) => void;
}
