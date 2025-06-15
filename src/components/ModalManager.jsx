import React, { useState, createContext, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState(null);
  const [modalData, setModalData] = useState({});

  const openModal = (modalType, data = {}) => {
    setCurrentModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setCurrentModal(null);
    setModalData({});
  };

  const switchModal = (modalType, data = {}) => {
    setCurrentModal(modalType);
    setModalData(data);
  };

  return (
    <ModalContext.Provider value={{
      currentModal,
      modalData,
      openModal,
      closeModal,
      switchModal
    }}>
      {children}
    </ModalContext.Provider>
  );
};