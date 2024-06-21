type MainProps = {
  children: React.ReactNode;
};

export default function Main({ children }: MainProps) {
  return <main className='flex flex-col gap-2'>{children}</main>;
}
