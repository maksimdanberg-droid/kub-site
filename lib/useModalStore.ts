"use client";

import { create } from 'zustand';

interface ModalStore {
  isConsultationModalOpen: boolean;
  openConsultationModal: () => void;
  closeConsultationModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isConsultationModalOpen: false,
  openConsultationModal: () => set({ isConsultationModalOpen: true }),
  closeConsultationModal: () => set({ isConsultationModalOpen: false }),
}));
