import create from 'zustand';
import { supabase } from '@/utils/supabase/clientJS';

interface UserState {
  user: any | null;
  setUser: (user: any | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
}));

// Initialize user state
supabase.auth.getSession().then(({ data: { session } }) => {
  useUserStore.getState().setUser(session?.user ?? null);
  console.log("changed", session?.user)
});

// Set up real-time listener
supabase.auth.onAuthStateChange((event, session) => {
    console.log("changed onauthstatechange", event)
  useUserStore.getState().setUser(session?.user ?? null);
});