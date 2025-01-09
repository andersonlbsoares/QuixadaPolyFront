// src/components/ChoiceModal.js
import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
  display: ${props => props.show ? 'flex' : 'none'};
`;

const ModalContainer = styled.div`
  background-color: #000;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 16px;
`;

const ModalMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &.confirm {
    background-color: #4caf50;
    color: #fff;
  }

  &.cancel {
    background-color: #f44336;
    color: #fff;
  }
`;

const ChoiceModal = ({ title, message, onConfirm, onCancel, show, button1, button2 }) => {
  return (

		<ModalBackground show={show}>
      <ModalContainer>
          <ModalTitle>{title}</ModalTitle>
          <ModalMessage>{message}</ModalMessage>
          <ButtonContainer>
            {button2 !== "" && <Button className="cancel" onClick={onCancel}>{button2}</Button>}
            {button1 !== "" && <Button className="confirm" onClick={onConfirm}>{button1}</Button>}
          </ButtonContainer>
      </ModalContainer>
		</ModalBackground>
	);
};

export default ChoiceModal;
