import React from 'react';
import { CheckboxProps } from './Checkbox.types';

export function Checkbox({ id, label, checked, onChange, disabled, containerClassName = '' }: CheckboxProps) {
  return (
    <div className={`form-check mb-3 ${containerClassName}`}>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={`${label}${id}`}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={`${label}${id}`}>
        {label}
      </label>
    </div>
  );
}
