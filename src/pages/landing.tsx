import { useLocation } from 'wouter';
import Form from '../components/form';
import Main from '../components/main';
import { userStore } from '../store/user.store';

type userData = {
  name: string;
  email: string;
  message: string;
};

export default function Landing() {
  const { addUser, addId, addMessage, user, reset } = userStore();
  const [, setLocation] = useLocation(); // Paso 2: Utiliza useLocation

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: userData = {
      name: e.currentTarget.name.value,
      email: e.currentTarget.email.value,
      message: e.currentTarget.message.value,
    };
    if (user.email !== data.email) {
      addUser(data.name, data.email);
      const uuid = Math.random().toString(36).substring(7);
      addId(uuid);
      reset();
    }
    addMessage(data.message, 'user');
    setLocation('/chat');
  };
  return (
    <>
      <header className='flex flex-col items-center w-full'>
        <nav className='flex w-full'>
          <ul className='flex justify-between w-full'>
            <li>
              <a href='/'>Inicio</a>
            </li>
            <li>
              <a href='/quejas'>Quejas</a>
            </li>
            <li>
              <a href='/preguntas'>Preguntas</a>
            </li>
          </ul>
        </nav>
      </header>
      <Main>
        <h1 className='mt-8 text-4xl font-bold text-center text-gray-800'>
          Bienvenido a nuestro banco
        </h1>
        <div className='flex flex-col items-center w-full'>
          <p>Centro de Atención al Cliente Bancario</p>
          <p>¿Tienes alguna queja o pregunta? ¡Estamos aquí para ayudarte!</p>
        </div>
        <section className='flex flex-col items-center w-full'>
          <h3 className='mt-8 text-2xl font-bold text-center text-gray-800'>
            Indicanos tu pregunta o queja
          </h3>
          <Form
            inputs={[
              {
                label: 'Nombre',
                type: 'text',
                name: 'name',
                value: '',
                placeholder: 'Escribe tu nombre',
              },
              {
                label: 'Correo',
                type: 'email',
                name: 'email',
                value: '',
                placeholder: 'Escribe tu correo',
              },
              {
                label: 'Mensaje',
                type: 'text',
                name: 'message',
                value: '',
                placeholder: 'Escribe tu mensaje',
              },
            ]}
            button={{
              label: 'Enviar',
              type: 'submit',
            }}
            onSubmit={handleSubmit}
          />
        </section>
      </Main>
    </>
  );
}
