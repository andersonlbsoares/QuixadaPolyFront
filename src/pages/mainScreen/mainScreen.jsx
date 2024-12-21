import * as React from "react";
import { useEffect, useState } from "react";
import { Container, Column, PlayerList, BoardContainer, CenterBox, Tile, Historico, Button } from "./styles";
import Dice from "./Components/Dice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChoiceModal from './Components/ChoiceModal';
const MainScreen = () => {
    const navigate = useNavigate();
    const urlBack = process.env.REACT_APP_BACK_URL;

    // Place squares on the board perimeter
    const [players, setPlayers] = useState([]);
    const [tiles, setTiles] = useState([]);
    const [history, setHistory] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [currentPlayerName, setCurrentPlayerName] = useState("");
    const [gameIsRunning, setGameIsRunning] = useState(false);
    const [update, setUpdate] = useState(false);
    const [diceValue1, setValeuDice1] = useState(1);
    const [diceValue2, setValeuDice2] = useState(1);

    let namePlayer = sessionStorage.getItem("namePlayer");
    let sessionId = sessionStorage.getItem("sessionId");



    useEffect(() => {
        if (!namePlayer || !sessionId) {
            navigate("/");
        }
    }, [namePlayer, sessionId, navigate]);

    useEffect(() => {
        const fetchStatusGame = async () => {
            try {
                const response = await axios.get(`${urlBack}/sessao/${sessionId}`);
                setPlayers(response.data.players);
                setTiles(response.data.board.tiles);
                setHistory(response.data.anotacoes);
                
                setCurrentPlayer(response.data.currentPlayerIndex);
                setCurrentPlayerName(response.data.players[response.data.currentPlayerIndex].name);
                setGameIsRunning(response.data.isGameRunning);
                console.log(currentPlayer);
                console.log(currentPlayerName);
                console.log(gameIsRunning);

            } catch (error) {
                console.error("Erro ao buscar participantes:", error);
            }
        };
        fetchStatusGame();
    }, [sessionId, urlBack, update]);

    const TileMap = () => {
        return tiles.map((tile) => {
            let position =
                tile.row === 11
                    ? "bottom"
                    : tile.column === 1
                    ? "left"
                    : tile.column === 11
                    ? "right"
                    : tile.row === 1
                    ? "top"
                    : undefined;
            return (
                <Tile
                    key={tile.name}
                    style={{
                        gridColumn: tile.column,
                        gridRow: tile.row,
                    }}
                    bgColor={tile.bgColor}
                    ownerColor={tile.owner?.color}
                    position={position}
                >
                    <div className="tile-name">{tile.name}</div>

                    {tile.rent && (
                        <>
                            <div className="house-container">
                                {tile.hotel ? (
                                    <div className="hotel" />
                                ) : (
                                    Array.from({ length: tile.houses }).map((_, i) => (
                                        <div key={i} className="house" />
                                    ))
                                )}
                            </div>
                            <div className="tile-info">
                                <span>Aluguel: ${tile.rent}</span>
                                <br />
                                <span>Preço: ${tile.price}</span>
                            </div>
                        </>
                    )}
                </Tile>
            );
        });
    };

    const handleStartGame = async () => {
        try {
            let diceValues = await axios.post(`${urlBack}/sessao/${sessionId}/comecar`);
            console.log(diceValues)
            diceValues = diceValues.data.diceRolls;
            diceValues.forEach((player) => {
                if(player.player.name === namePlayer) {
                    setValeuDice1(parseInt(player.dice1));
                    setValeuDice2(parseInt(player.dice2));
                    console.log("dado 1", diceValue1);
                    console.log("dado 2", diceValue1);
                }
            }
            );

            setUpdate(!update);
        } catch (error) {
            console.error("Erro ao iniciar o jogo:", error);
        }
    }

    const handleThrowDice = async () => {
        try {
            let diceValues = await axios.get(`${urlBack}/sessao/${sessionId}/jogar`, { params: {playerName: namePlayer}})
            
            diceValues = diceValues.data.diceRoll;
            setValeuDice1(parseInt(diceValues.dice1));
            setValeuDice2(parseInt(diceValues.dice2));

            setUpdate(!update);
        } catch (error) {
            console.error("Erro ao iniciar o jogo:", error);
        }
    }

    const handleConfirm = async () => {
        try {
            alert("confirmado");
            // await axios.post(`${urlBack}/sessao/${sessionId}/confirmar`);
            setUpdate(!update);
        } catch (error) {
            console.error("Erro ao confirmar:", error);
        }
    }

    const handleCancel = async () => {
        try {
            alert("cancelado");
            // await axios.post(`${urlBack}/sessao/${sessionId}/cancelar`);
            setUpdate(!update);
        } catch (error) {
            console.error("Erro ao cancelar:", error);
        }
    }

    return (
        <Container>
            <ChoiceModal 
                title="Confirmação" 
                message="Tem certeza que deseja continuar?" 
                onConfirm={handleConfirm} 
                onCancel={handleCancel} 
            />
            <Column width="25%">
                <h3>Participantes</h3>
                <PlayerList>
                    {players.map((player, index) => (
                        <li key={index}>
                            {currentPlayer !== index && <strong>⏳</strong>}
                            {currentPlayer === index && <strong>🎲</strong>}
                            {player.name === namePlayer && <strong>{player.name}  (Você)</strong>}
                            {player.name !== namePlayer && <strong>{player.name}</strong>}
                            <div>Saldo: {player.balance}</div>
                        </li>
                    ))}
                </PlayerList>
            </Column>
            <Column width="50%">
                <BoardContainer>
                    <TileMap />
                    <CenterBox>
                        <div align="center">
                            {currentPlayerName == namePlayer && <h3>Sua vez de jogar</h3>}
                            {currentPlayerName != namePlayer && <h3>Vez do jogador {currentPlayerName}</h3>}
                            <Dice faceValue={diceValue1} />
                            {!gameIsRunning && <Button onClick={handleStartGame}>Começar o jogo</Button>}
                            {currentPlayerName == namePlayer && gameIsRunning && <Button onClick={handleThrowDice}>Lançar os dados</Button>}
                            <Dice faceValue={diceValue2} />
                        </div>
                    </CenterBox>
                </BoardContainer>
            </Column>
            <Column width="25%">
            <Historico>
                <h3>Historico</h3>
                {/* Imprime invertido do ultimo para o primeiro */}

                    {history.length === 0 && <p>Nenhum movimento registrado</p>}

                    {history.slice().reverse().map((item, index) => (
    <p key={index}>{item}</p>
))}
            </Historico>
            </Column>
        </Container>
    );
};

export default MainScreen;
