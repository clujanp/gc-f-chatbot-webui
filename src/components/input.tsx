import { useState } from 'react';

export type InputProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}: InputProps) {
  const [inputValue, setInputValue] = useState(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={handleChange}
        className='p-2 border border-gray-300 rounded-md'
        placeholder={placeholder}
      />
    </div>
  );
}
