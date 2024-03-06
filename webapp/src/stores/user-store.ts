
import {create} from 'zustand';
import { JwtPayload } from '../services/auth-service';

interface UserState {
    user: JwtPayload | null,
    setUser: (user : JwtPayload) => void,
    logout: () => void,
  }
  

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({user}),
    logout: () => set({user:null})
  }));