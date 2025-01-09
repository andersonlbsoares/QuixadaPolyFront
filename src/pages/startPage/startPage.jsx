import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Input,
    Button,
    Title,
    Slogan,
    ButtonGroup,
    CustomToastContainer,
    Background,
    InputColor
} from "./styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StartPage = () => {
    const navigate = useNavigate();
    const urlBack = process.env.REACT_APP_BACK_URL;
    const [sessionId, setSessionId] = useState("");
    const [name, setName] = useState("");
    // cor aleatória
    const [color, setColor] = useState("#" + Math.floor(Math.random() * 16777215).toString(16));

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSessionIdChange = (e) => {
        setSessionId(e.target.value);
    };

    const handleJoinGame = () => {
        if (sessionId && name) {
            axios
                .post(`${urlBack}/sessao/${sessionId}/jogador`, {
                    name: name,
                    color: color
                })
                .then((response) => {
                    if (response.data.sessionNumber) {
                        sessionStorage.setItem("sessionId", sessionId);
                        sessionStorage.setItem("namePlayer", name);
                        navigate(`/game`);
                    } else {
                        toast("Partida não encontrada");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast(error.response.data.message);
                });
        } else {
            toast("Insira o nome e o ID da partida");
        }
    };

    const handleCreateGame = async () => {
        if (name) {
            const novaSessao = await axios.post(`${urlBack}/sessao`);
            let sessionNumber = novaSessao.data.sessionNumber;

            axios
                .post(`${urlBack}/sessao/${sessionNumber}/jogador`, {
                    name: name,
                    color: color
                })
                .then((response) => {
                    if (response.data.sessionNumber) {
                        sessionStorage.setItem("sessionId", sessionNumber);
                        sessionStorage.setItem("namePlayer", name);
                        navigate(`/game`);
                    } else {
                        toast("Partida não encontrada");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast(error.response.data.message);
                });
        } else {
            toast("Para criar uma partida insira o seu nome");
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
                {/* INPUT DO TIPO COR */}
                <InputColor type="color" id="color" onChange={(e) => setColor(e.target.value)} value={color} />

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
