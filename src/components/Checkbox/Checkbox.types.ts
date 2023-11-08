import { ChangeEventHandler } from 'react';

export interface CheckboxProps {
  id: number;
  label: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  containerClassName?: string;
  disabled?: boolean;
}
