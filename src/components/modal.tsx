import Button from "./button";

type ModalProps = {
	title: string;
	message: string;
	onClose: () => void;
	onConfirm: () => void;
	show: boolean;
}

export default function Modal({ title, message, onClose, onConfirm, show }: ModalProps) {
	return (
		<div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center ${show ? 'block' : 'hidden'}`}>
			<div className='flex flex-col gap-4 p-4 bg-white rounded-md w-fit'>
				<h2 className='text-xl font-bold'>{title}</h2>
				<p>{message}</p>
				<div className='flex justify-between gap-2'>
					<Button label='Cancelar' onClick={onClose} type='button' variant='primary' fit={true} />
					<Button label='Confirmar' onClick={onConfirm} type='button' variant='danger' fit={true} />
				</div>
			</div>
		</div>
	);

}
