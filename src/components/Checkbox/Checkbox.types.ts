import { ChangeEventHandler } from 'react';

export interface CheckboxProps {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  containerClassName?: string;
  disabled?: boolean;
}
