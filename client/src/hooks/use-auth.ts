import { create } from "zustand";
import { AuthType } from "./../interfaces/index";

type AuthStore = {
  authState: AuthType;
  setAuth: (state: AuthType) => void;
};

export const useAuth = create<AuthStore>((set) => ({
  authState: "login",
  setAuth: (state) => set({ authState: state }),
}));
