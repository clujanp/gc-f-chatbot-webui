import { useLocation } from 'wouter';
import Form from '../components/form';
import Main from '../components/main';
import { userStore } from '../store/user.store';

export default function Landing() {
  const { addUser, addId, addMessage, user, reset } = userStore();
  const [, setLocation] = useLocation(); // Paso 2: Utiliza useLocation

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
		const email = e.currentTarget.email.value;
		const name = e.currentTarget.nombre.value;
    if (user.email !== email) {
      addUser(name, email);
      const uuid = Math.random().toString(36).substring(7);
      addId(uuid);
      reset();
			const message = `Hola ${name}, ¿En qué puedo ayudarte hoy?`;
			addMessage(message, 'bot');
    }
		setLocation('/chat');
  };
  return (
    <>
      <header className='flex flex-col items-center w-full p-3'>
				<img src='/img/logo.png' alt='Logo' className='w-32 h-32 rounded-full' />
      </header>
      <Main>
        <h1 className='mt-8 text-4xl font-bold text-center text-gray-800'>
          Bienvenido a CliSol
        </h1>
        <div className='flex flex-col items-center w-full'>
          <p>
            El asistente virtual que te ayudará a gestionar las PQR de tus
            clientes.
          </p>
          <p>¿Prueba a escribir algo en el chat?</p>
        </div>
        <section className='flex flex-col items-center w-full'>
          <Form
            inputs={[
              {
                label: 'Nombre',
                type: 'text',
                name: 'nombre',
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
            ]}
            buttons={[
              {
                label: 'Enviar',
                type: 'submit',
                variant: 'primary',
                fit: true,
              },
            ]}
            onSubmit={handleSubmit}
          />
        </section>
      </Main>
    </>
  );
}
