export type ButtonProps = {
  label: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
  variant: 'primary' | 'secondary' | 'danger' | 'success';
  fit: boolean;
};

export default function Button({
  label,
  onClick,
  type,
  variant,
  fit,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className='p-2 text-white bg-blue-500 border border-gray-300 rounded-md'
      style={{
        backgroundColor:
          variant === 'primary'
            ? 'rgb(96 165 250)'
            : variant === 'danger'
              ? 'rgb(248 113 113)'
              : variant === 'success'
                ? 'rgb(16 185 129)'
                : 'transparent',
        color: variant === 'secondary' ? 'rgb(96 165 250)' : 'white',
        width: fit ? 'fit-content' : 'auto',
      }}
    >
      {label}
    </button>
  );
}
