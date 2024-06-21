import { useLocation } from 'wouter';
import Main from '../components/main';
import { userStore } from '../store/user.store';
import Avatar from '../components/avatar';
import Form from '../components/form';

export default function Chatbox() {
  const [, setLocation] = useLocation();
  const { user, id, messages, addMessage } = userStore();
  if (id === '') setLocation('/');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      message: e.currentTarget.message.value,
    };
    addMessage(data.message, 'user');
    e.currentTarget.reset();
  };
  return (
    <Main>
      <h1 className='mt-8 text-4xl font-bold text-center text-gray-800'>
        Chatbox
      </h1>
      <article
        className='flex flex-col gap-2 m-auto border border-gray-300  w-[34rem] rounded-2xl justify-between'
        style={{ height: '80vh' }}
      >
        <header className='flex items-center gap-2 p-3 text-white bg-blue-400 rounded-t-lg'>
          <Avatar alt={user.name} email={user.email} size='large' />
          <div>
            <h4>{user.name}</h4>
            <span>
              {user.email.split('@')[0]} - {id}
            </span>
          </div>
        </header>
        <main
          className='flex flex-col gap-2 p-2 overflow-y-auto'
          style={{ height: '70%' }}
        >
          {messages.map((message, index) => (
            <MessageLabel
              key={index}
              message={message.text}
              type={message.agent}
              email={user.email}
              name={user.name}
            />
          ))}
          <MessageLabel
            message='Hola, soy un bot, ¿en qué puedo ayudarte?'
            type='bot'
          />
        </main>
        <footer>
          <Form
            inputs={[
              {
                label: '',
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
        </footer>
      </article>
    </Main>
  );
}

type MessageLabelProps = {
  message: string;
  type: 'user' | 'bot';
  email?: string;
  name?: string;
};

function MessageLabel({
  message,
  type,
  email = 'chatBot@ghf.com',
  name = 'bot3000',
}: MessageLabelProps) {
  return (
    <div
      className='flex w-full gap-2 p-2'
      style={{
        backgroundColor: type === 'user' ? 'blue' : 'green',
        flexDirection: type === 'user' ? 'row-reverse' : 'row',
      }}
    >
      <Avatar alt={name} email={email} size='small' />
      <p>{message}</p>
    </div>
  );
}
