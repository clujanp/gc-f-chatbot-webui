import Button, { ButtonProps } from './button';
import Input, { InputProps } from './input';

type FormProps = {
  inputs: InputProps[];
  button: ButtonProps;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};
export default function Form({ inputs, button, onSubmit }: FormProps) {
  return (
    <form onSubmit={onSubmit} className='flex flex-col w-full gap-2'>
      {inputs.map((input, index) => (
        <Input key={index} {...input} />
      ))}
      <Button {...button} />
    </form>
  );
}
