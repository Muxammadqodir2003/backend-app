import { IPost } from "@/interfaces";
import { create } from "zustand";

type ConfirmStore = {
  isOpen: boolean;
  post: IPost;
  onClose: () => void;
  onOpen: () => void;
  setPost: (post: IPost) => void;
};

export const useConfirm = create<ConfirmStore>((set) => ({
  isOpen: false,
  post: {} as IPost,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setPost: (post) => set({ post }),
}));
