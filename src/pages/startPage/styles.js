import styled, { keyframes } from "styled-components";
import { ToastContainer } from "react-toastify";

const slideAnimation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100px; /* Desce 100px */
  }
`;


export const InputColor = styled.input`
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
    border: none;
    width: 300px;
    border-radius: 100px;
    height: 40px;
    background-color: ${(props) => props.value || "#2d2d2d"};
    `
;


export const Container = styled.div`
    background-color: #121212;
    color: #fff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    opacity: 0.9;
`;

export const Title = styled.h1`
    font-size: 3.5rem;
    margin-bottom: 10px;
    color: #fff;

    span {
        color: #a366ff;
    }
`;

// Slogan
export const Slogan = styled.p`
    font-size: 1.2rem;
    margin-bottom: 30px;
    color: #ccc;
`;

// Campo de entrada
export const Input = styled.input`
    padding: 12px 20px;
    font-size: 1rem;
    margin-bottom: 20px;
    border: none;
    border-radius: 8px;
    width: 280px;
    background-color: #2d2d2d;
    color: #fff;
`;

// Botão estilizado
export const Button = styled.button`
    background: linear-gradient(90deg, #6e33f5, #a366ff);
    border: none;
    color: white;
    font-size: 1.2rem;
    padding: 12px 25px;
    border-radius: 8px;
    cursor: pointer;
    margin: 10px;
    &:hover {
        background: linear-gradient(90deg, #5c29d1, #8c4ddd);
    }
`;

// Botões de opções (Container)
export const ButtonGroup = styled.div`
    display: flex;
    gap: 15px;
`;

export const Row = styled.div`
    display: flex;
    gap: 15px;
    width: ${(props) => props.width || "100%"};
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: ${(props) => props.width || "100%"};
    align-items: center;
`;

export const CustomToastContainer = styled(ToastContainer)`
    .Toastify__toast {
        border-radius: 10px;
        background-color: #333333;
        color: #ffffff;
        font-family: "Arial", sans-serif;
    }

    .Toastify__toast--success {
        background-color: #4caf50;
    }

    .Toastify__toast--error {
        background-color: #f44336;
    }

    .Toastify__toast--info {
        background-color: #2196f3;
    }

    .Toastify__toast--warning {
        background-color: #ff9800;
    }

    .Toastify__progress-bar {
        background: linear-gradient(90deg, #5c29d1, #8c4ddd);
    }
`;
export const Background = styled.div`
    width: 200%;
    height: 200%;
    background-color: #121212;
    background-image: url("/fundo_branco_borda.png");
    background-repeat: repeat;
    background-size: 300px;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    transform-origin: top;
    transform: rotate(30deg);
    animation: ${slideAnimation} 10s linear infinite alternate;
    z-index: -1;
`;
