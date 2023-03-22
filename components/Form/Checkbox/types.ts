import { OptionItem } from '@/types';

export interface CheckboxProps {
  options: OptionItem[];
  optionsSelected: OptionItem[];
  title?: string;
  onChange: any;
  id?: string;
  name?: string;
  error?: string;
  multiple?: boolean;
}
