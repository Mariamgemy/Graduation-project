import React from 'react';
import { useModal } from './ModalManager';
import LoginCard from '../pages/LoginCard';
import CustomModal from '../pages/IdValidation';
import ForgotPassword from '../pages/ForgotPassword';

const ModalContainer = () => {
  const { currentModal, closeModal } = useModal();

  const renderModal = () => {
    switch (currentModal) {
      case 'login':
        return <LoginCard show={true} handleClose={closeModal} />;
      case 'register':
        return <CustomModal show={true} handleClose={closeModal} />;
      case 'forgotPassword':
        return <ForgotPassword show={true} handleClose={closeModal} />;
      default:
        return null;
    }
  };

  return renderModal();
};

export default ModalContainer;