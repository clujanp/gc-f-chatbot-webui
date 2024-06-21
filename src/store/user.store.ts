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
  addMessage: (message: string, agent: Agent) => void;
  reset: () => void;
};

export const userStore = create<Store>()(
  persist(
    (set) => ({
      user: { name: '', email: '' },
      addUser: (name, email) => set({ user: { name, email } }),
      id: '',
      addId: (id) => set({ id }),
      messages: [],
      addMessage: (message, agent) =>
        set((state) => ({
          messages: [...state.messages, { agent: agent, text: message }],
        })),
      reset: () => set({ messages: [] }),
    }),
    {
      name: 'user-storage', // unique name
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
