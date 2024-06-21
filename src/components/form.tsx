import Button, { ButtonProps } from './button';
import Input, { InputProps } from './input';

type FormProps = {
  inputs: InputProps[];
  buttons: ButtonProps[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
export default function Form({ inputs, buttons, onSubmit }: FormProps) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(e);
	}
  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full gap-2'>
      {inputs.map((input, index) => (
        <Input key={index} {...input} />
      ))}
      <div className='grid w-full grid-cols-2 gap-2'>
				{buttons.map((button, index) => (
					<Button key={index} {...button} />
				))}
			</div>
    </form>
  );
}
