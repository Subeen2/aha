import { useState } from "react";

interface UseModalResult {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useOpenModal = (): UseModalResult => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
  };
};

export default useOpenModal;
