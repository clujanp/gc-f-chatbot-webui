export type ButtonProps = {
  label: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
};

export default function Button({ label, onClick, type }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className='p-2 text-white bg-blue-500 border border-gray-300 rounded-md'
    >
      {label}
    </button>
  );
}
