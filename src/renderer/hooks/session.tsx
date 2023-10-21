import { create } from 'zustand';

export const useDataStore = create((set) => ({
  userData: undefined,
  setUserData: (userData: any) => set(() => ({ userData })),
  unsetUserData: () => set({ userData: undefined }),
}));
