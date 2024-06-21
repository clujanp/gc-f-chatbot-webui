import { useEffect } from "react";

export type InputProps = {
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	referecia?: React.RefObject<HTMLInputElement>;
};
export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
	referecia,
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };
	useEffect(() => {
		console.log(value);
	}, [value]);
  return (
    <div className='flex flex-col w-full'>
      <label htmlFor={name}>{label}</label>
      <input
				ref={referecia}
        type={type}
        name={name}
        defaultValue={value}
        onChange={handleChange}
        className='w-auto p-2 break-words border border-gray-300 rounded-md h-fit'
        placeholder={placeholder}
				required={true}
      />
    </div>
  );
}
