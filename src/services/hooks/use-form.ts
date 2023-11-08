import { ChangeEvent, useState } from 'react';

export function useForm(inputValue: any) {
  const [values, setValues] = useState(inputValue);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target;
    setValues({ ...values, [name]: value });
    console.log(evt.target);
    console.log(values);
  };
  return { values, handleChange, setValues };
}
