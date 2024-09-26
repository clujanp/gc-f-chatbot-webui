import { useLocation } from 'wouter';
import Main from '../components/main';
import { userStore } from '../store/user.store';
import Avatar from '../components/avatar';
import Form from '../components/form';
import { useEffect, useRef, useState } from 'react';
import Button from '../components/button';
import Modal from '../components/modal';
import { sendMessage } from '../services/sendMessage';

export default function Chatbox() {
  const emailChatBot = 'chatBot@gcf.com';
  const nameChatBot = 'Bot3000';
  const mainRef = useRef(null);
  const inputRef = useRef(null);
  const [modalInfo, setModalInfo] = useState<{
    title: string;
    message: string;
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
  }>({
    title: '',
    message: '',
    show: false,
    onClose: () => {},
    onConfirm: () => {},
  });
  const [state, setState] = useState<'idle' | 'loading' | 'error' | 'success'>(
    'idle',
  );
  const [currentMessage, setCurrentMessage] = useState('');
  const [textLoading, setTextLoading] = useState('.');
  const [, setLocation] = useLocation();
  const { user, id, messages, addMessage, reset, clearStore, addId, setProduct, product, setFeel, feel } =
    userStore();
  if (id === '') setLocation('/');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const message = e.currentTarget.message.value;
    addMessage(message, 'user');
		setState('loading');
		sendMessage(id, message)
			.then((data) => {
				const response = data.response;
				const product = data.product;
				// "feels": {
				// 	"enojo": 60,
				// 	"felicidad": 0,
				// 	"frustracion": 80,
				// 	"tristeza": 40
				// },
				const feels = data.feels;
				const feelDeMayorValor = Object.entries(feels).reduce((acc, curr) => {
					if (curr[1] > acc.value) {
						return { label: curr[0], value: curr[1] };
					} else {
						return acc;
					}
				}, { label: '', value: -Infinity });
				setFeel(feelDeMayorValor.label, feelDeMayorValor.value);
				addMessage(response, 'bot');
				setProduct(product);
				setCurrentMessage('');
				setState('success');
			});
    if (inputRef.current) {
      const input = inputRef.current as HTMLInputElement;
      input.value = '';
      input.focus();
    }
  };
  useEffect(() => {
    if (mainRef.current) {
      const section = mainRef.current as HTMLDivElement;
      section.scrollTop = section.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTextLoading((text) => {
        if (text === '...') return '.';
        return text + '.';
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const showModalresetHistory = () => {
    setModalInfo({
      title: 'Borrar Chat completo',
      message: '¿Estás seguro de que deseas borrar todo el chat?',
      show: true,
      onClose: () => setModalInfo({ ...modalInfo, show: false }),
      onConfirm: () => {
        reset();
        const uuid = Math.random().toString(36).substring(7);
        addId(uuid);
        setModalInfo({ ...modalInfo, show: false });
      },
    });
  };

  const showModalCloseChat = () => {
    setModalInfo({
      title: 'Cerrar Chat',
      message: '¿Estás seguro de que deseas cerrar el chat?',
      show: true,
      onClose: () => setModalInfo({ ...modalInfo, show: false }),
      onConfirm: () => {
        clearStore();
        setModalInfo({ ...modalInfo, show: false });
        setLocation('/');
      },
    });
  };

  return (
    <>
      <div
        // buton to close chat en la parte superior fix
        className='fixed top-0 right-0 p-2'
      >
        <Button
          label='X'
          type='button'
          variant='danger'
          onClick={showModalCloseChat}
          fit={true}
        />
      </div>
      <Modal
        title={modalInfo.title}
        message={modalInfo.message}
        show={modalInfo.show}
        onClose={modalInfo.onClose}
        onConfirm={modalInfo.onConfirm}
      />
      <Main>
        <h1 className='mt-8 text-4xl font-bold text-center text-gray-800'>
          Chatbox CliSol
        </h1>
        <span className='text-center text-gray-800'>
          Este asistente virtual te ayudará a gestionar las PQR de tus clientes,
          prueba la Demo.
        </span>
        <article
          className='flex flex-col gap-2 m-auto border border-gray-300  w-[34rem] rounded-2xl justify-between p-3'
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
						<span>
							{product === '' ? '' : 'El producto detectado es:'} {product}
						</span>
						<span>
							{feel.label === '' ? '' : 'El sentimiento detectado es:'} {feel.label}
							{feel.label === '' ? '' : ` con un valor de ${feel.value}`}
						</span>
          <main
            ref={mainRef}
            className='flex flex-col gap-2 p-2 overflow-y-auto'
            style={{ height: '70%' }}
          >
            {messages.map((message, index) => (
              <MessageLabel
                key={index}
                message={message.text}
                type={message.agent}
                email={message.agent === 'user' ? user.email : emailChatBot}
                name={message.agent === 'user' ? user.name : nameChatBot}
              />
            ))}
            {state === 'loading' && (
              <MessageLabel
                message={textLoading}
                type='bot'
                email={emailChatBot}
                name={nameChatBot}
              />
            )}
          </main>
          <footer>
            <Form
              inputs={[
                {
                  label: '',
                  type: 'textarea',
                  name: 'message',
                  value: currentMessage,
                  placeholder: 'Escribe tu mensaje',
                  referecia: inputRef,
                },
              ]}
              buttons={[
                {
                  label: 'Enviar',
                  type: 'submit',
                  variant: 'primary',
                  fit: false,
                },
                {
                  label: 'Reiniciar Chat',
                  type: 'button',
                  onClick: () => showModalresetHistory(),
                  variant: 'secondary',
                  fit: true,
                },
              ]}
              onSubmit={handleSubmit}
            />
          </footer>
        </article>
      </Main>
    </>
  );
}

type MessageLabelProps = {
  message: string;
  type: 'user' | 'bot';
  email: string;
  name: string;
};

function MessageLabel({ message, type, email, name }: MessageLabelProps) {
  return (
    <div
      className='flex w-full gap-2 p-2'
      style={{
        flexDirection: type === 'user' ? 'row-reverse' : 'row',
      }}
    >
      <Avatar alt={name} email={email} size='small' />
      <p
        className='p-2 text-white break-words bg-blue-500 border border-gray-300 rounded-md w-fit'
        style={{
          backgroundColor:
            type === 'user'
              ? 'rgba(59, 130, 246, 0.8)'
              : 'rgba(16, 185, 129, 0.8)',
					textAlign: type === 'user' ? 'right' : 'left',
        }}
      >
        {message}
      </p>
    </div>
  );
}
