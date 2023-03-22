import React from 'react';

export interface TextFieldProps {
  name: string;
  label?: string;
  type?: string;
  value?: string;
  error?: string;
  required?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
