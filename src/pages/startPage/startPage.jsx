import React, { useState } from "react";
import {
    Container,
    Input,
    Button,
    Title,
    Slogan,
    ButtonGroup,
    CustomToastContainer,
    Background,
} from "./styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDollarCircle } from "react-icons/ai";
const StartPage = () => {
    const [sessionId, setSessionId] = useState("");
    const [name, setName] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSessionIdChange = (e) => {
        setSessionId(e.target.value);
    };

    const handleJoinGame = () => {
        if (sessionId && name) {
            //something
        } else {
            toast("Insira o nome e o ID da partida");
        }
    };

    const handleCreateGame = () => {
        if (name) {
            alert("Create Game");
        }
    };

    return (
        <>
            <Background />
            <Container>
                <Title>
                    QUIXADA<span>POLY</span>
                </Title>
                <Slogan>Faça o seu monopólio em Quixadá</Slogan>
                <Input placeholder="Digite seu nome" id="name" onChange={handleNameChange} />
                <Input
                    placeholder="Digite o ID da partida"
                    id="sessionId"
                    onChange={handleSessionIdChange}
                />
                <ButtonGroup>
                    <Button onClick={handleJoinGame}>Entrar na Partida</Button>
                    <Button onClick={handleCreateGame}>Criar Partida</Button>
                </ButtonGroup>
                <CustomToastContainer ToastContainer={ToastContainer} />
            </Container>
        </>
    );
};

export default StartPage;
