import ModalManager from "@/components/modals/modal-manager";
import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,    
    props: {},      
  });

  const showModal = (type, props = {}) => {
    setModal({ isOpen: true, type, props });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ modal, showModal, closeModal }}>
      {children}
      <ModalManager modal={modal} closeModal={closeModal} />
    </ModalContext.Provider>
  );
}




export function useModal() {
  return useContext(ModalContext);
}
