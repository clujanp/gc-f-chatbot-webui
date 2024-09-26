import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Agent = 'user' | 'bot';
type Message = {
  agent: Agent;
  text: string;
};
type Store = {
  id: string;
  addId: (id: string) => void;
  user: { name: string; email: string };
  addUser: (name: string, email: string) => void;
  messages: Message[];
	product: string;
	setProduct: (product: string) => void;
	feel: {label: string, value: number};
	setFeel: (label: string, value: number) => void;
  addMessage: (message: string, agent: Agent) => void;
  reset: () => void;
  clearStore: () => void;
};

export const userStore = create<Store>()(
  persist(
    (set) => ({
			feel: {label: '', value: 0},
			setFeel: (label, value) => set({ feel: {label, value} }),
      user: { name: '', email: '' },
      addUser: (name, email) => set({ user: { name, email } }),
      id: '',
			product: '',
			setProduct: (product) => set({ product }),
      addId: (id) => set({ id }),
      messages: [],
      addMessage: (message, agent) =>
        set((state) => ({
          messages: [...state.messages, { agent: agent, text: message }],
        })),
      reset: () => set({ messages: [], product: '', feel: {label: '', value: 0} }),
      clearStore: () =>
        set({ user: { name: '', email: '' }, messages: [], id: '', product: '', feel: {label: '', value: 0} }),
    }),
    {
      name: 'user-storage', // unique name
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
