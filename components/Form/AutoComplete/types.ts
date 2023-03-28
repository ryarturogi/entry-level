import { OptionItem } from '../../../types/index';
export interface AutoCompleteProps {
  options: OptionItem[];
  optionsSelected: OptionItem[];
  onChange: any;
  title?: string;
  placeholder?: string;
  error?: string;
  multiple?: any;
  required?: Boolean;
  setTouched?: any;
  name?: string;
  touched?: Boolean;
}
