export interface TextareaFieldProps {
  label?: string;
  name?: string;
  error?: string;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  success?: string;
  value?: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}
