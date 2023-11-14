import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

export interface TextFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  inputType?: HTMLInputTypeAttribute;
  containerClassName?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  errorText?: string;
}
