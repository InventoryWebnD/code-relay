"use client";

import React, { createContext, useContext, useState } from "react";
import RegisterModal from "@/components/RegisterModal";

interface RegisterModalContextType {
  isOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
}

const RegisterModalContext = createContext<RegisterModalContextType | undefined>(undefined);

export function RegisterModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openRegisterModal = () => setIsOpen(true);
  const closeRegisterModal = () => setIsOpen(false);

  return (
    <RegisterModalContext.Provider value={{ isOpen, openRegisterModal, closeRegisterModal }}>
      {children}
      <RegisterModal isOpen={isOpen} onClose={closeRegisterModal} />
    </RegisterModalContext.Provider>
  );
}

export function useRegisterModal() {
  const context = useContext(RegisterModalContext);
  if (!context) {
    throw new Error("useRegisterModal must be used within a RegisterModalProvider");
  }
  return context;
}

