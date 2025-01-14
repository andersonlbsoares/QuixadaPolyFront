import * as React from "react";
import { useEffect, useState } from "react";
import { Container, Column, PlayerList, BoardContainer, CenterBox, Tile, Historico, Button, DivPlayer, Row, House, Hotel, WinnerShow} from "./styles";
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
    const [checarAcao, setChecarAcao] = useState(false);
    const [diceValue1, setValeuDice1] = useState(1);
    const [diceValue2, setValeuDice2] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState("");
    const [nameButtons, setNameButtons] = useState(["", ""]);
    const [routesActions, setRoutesActions] = useState(["", ""]);
    const [playerStatus, setPlayerStatus] = useState("Não é sua vez.");
    const [showWinner, setShowWinner] = useState(false);
    const [winner, setWinner] = useState("");
    const [sellProperties, setSellProperties] = useState([]);

    let namePlayer = sessionStorage.getItem("namePlayer");
    let sessionId = sessionStorage.getItem("sessionId");

    const atualizaJogo = async () => {
        try {
            const response = await axios.get(`${urlBack}/sessao/${sessionId}`);
            setPlayers(response.data.players);
            setTiles(response.data.board.tiles);
            setHistory(response.data.anotacoes);

            setGameIsRunning(response.data.isGameRunning);
            if(response.data.isGameRunning){
                setCurrentPlayer(response.data.currentPlayerIndex);
                setCurrentPlayerName(response.data.players[response.data.currentPlayerIndex].name);
            }
        } catch (error) {
            console.error("Erro ao buscar participantes:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(players)
            atualizaJogo();
            checaSePrecisaAcao();
        }, 1000);
        return () => clearInterval(interval);
    }, [currentPlayerName]);


    useEffect(() => {
        if (!namePlayer || !sessionId) {
            navigate("/");
        }
    }, [namePlayer, sessionId, navigate]);

    useEffect(() => {
        atualizaJogo();
    }, [sessionId, urlBack, update]);
    
    useEffect(() => {
        checaSePrecisaAcao();
    }, [currentPlayerName, checarAcao]);


    
    const TileMap = () => {
        return tiles.map((tile, index) => {
            const playersHere = players.filter((player) => player.position === index);

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
                    {playersHere && (
                        <div className="player-container">
                            <Row>
                                {playersHere.map((player, index) => (
                                    <DivPlayer key={index} color={player.color} />
                                ))}
                            </Row>
                        </div>
                    )}
                    

                    {tile.rent && (
                        <>
                            <div className="tile-info">
                                <span>Aluguel: ${tile.rent.toFixed(2)}</span>
                                <br />
                                <span>Preço: ${tile.price.toFixed(2)}</span>
                            </div>
                            <div className="house-container">
                                {tile.hotel ? (
                                    <Hotel />
                                ) : (
                                    Array.from({ length: tile.houses }).map((_, i) => (
                                        <House />
                                    ))
                                )}
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
            diceValues = diceValues.data.diceRolls;
            diceValues.forEach((player) => {
                if(player.player.name === namePlayer) {
                    setValeuDice1(parseInt(player.dice1));
                    setValeuDice2(parseInt(player.dice2));
                }
            }
            );
            setUpdate(!update);
        } catch (error) {
            console.error("Erro ao iniciar o jogo:", error);
        }
    }

    const checaSePrecisaAcao = async () => {
        try {
            let conteudo = await axios.get(`${urlBack}/sessao/${sessionId}/checaopcoes`, { params: {playerName: namePlayer}});
            if (conteudo.data.message == "Não é sua vez."){
                setPlayerStatus("Não é sua vez.");
                setShowModal(false);
            }else if (conteudo.data.message == "Sua vez, role os dados."){
                setPlayerStatus("Sua vez, role os dados.");
                setShowModal(false);
            }else if (conteudo.data.message.startsWith("O vencedor")){
                setWinner(conteudo.data.button1);
                setShowModal(false);
                setShowWinner(true);
            }
            else{
                if(conteudo.data.properties){
                    setSellProperties(conteudo.data.properties);
                }else{
                    setSellProperties([]);
                }
                setContentModal(conteudo.data.message);
                setNameButtons([conteudo.data.button1, conteudo.data.button2]);
                setRoutesActions([conteudo.data.route1, conteudo.data.route2]);
                setShowModal(true);
            }
        } catch (error) {

            if (error.status === 401) {
                sessionStorage.removeItem("namePlayer");
                sessionStorage.removeItem("sessionId");
                navigate("/");
            }
            console.error(error);
        }
    }

    const handleThrowDice = async () => {
        try {
            let diceValues = await axios.get(`${urlBack}/sessao/${sessionId}/jogar`, { params: {playerName: namePlayer}})
            
            diceValues = diceValues.data.diceRoll;
            setValeuDice1(parseInt(diceValues.dice1));
            setValeuDice2(parseInt(diceValues.dice2));

            setUpdate(!update);
            setChecarAcao(!checarAcao);
        } catch (error) {
            console.error("Erro ao iniciar o jogo:", error);
        }
    }

    const handleConfirm = async () => {
        try {
            await axios.get(`${urlBack}/sessao/${sessionId}/${routesActions[0]}`, { params: {playerName: namePlayer}} );
            setUpdate(!update);
            setShowModal(false);
        } catch (error) {
            console.error("Erro ao confirmar:", error);
        }
    }

    const handleCancel = async () => {
        try {
            await axios.get(`${urlBack}/sessao/${sessionId}/${routesActions[1]}`, { params: {playerName: namePlayer}} );
            setUpdate(!update);
            setShowModal(false);
        } catch (error) {
            console.error("Erro ao cancelar:", error);
        }
    }

    const handleDeleteSession = async () => {
        try {
            await axios.delete(`${urlBack}/sessao/${sessionId}`, { params: {playerName: namePlayer}});
            sessionStorage.removeItem("namePlayer");
            sessionStorage.removeItem("sessionId");
            navigate("/");
        } catch (error) {
            console.error("Erro ao deletar sessão:", error);
        }
    }

    const handleSell = async (property) => {
        try {
            await axios.get(`${urlBack}/sessao/${sessionId}/vender/${property.name}`, { params: {playerName: namePlayer}} );
            setUpdate(!update);
            setSellProperties([])
            setShowModal(false);
        } catch (error) {
            console.error("Erro ao vender:", error);
        }
    }

    return (
        <Container>
            <WinnerShow
                show={showWinner}
            >
                <p>O Vencedor é</p>
                <p>{winner}</p>
                <Button onClick={handleDeleteSession}>Encerrar Sessão</Button>

            </WinnerShow>
            <ChoiceModal 
                title="Confirmação" 
                message={contentModal}
                onConfirm={handleConfirm} 
                onCancel={handleCancel}
                onSell={handleSell}
                button1={nameButtons[0]}
                button2={nameButtons[1]}
                sellProperties={sellProperties}
                show={showModal}
            />
            <Column width="25%">
                <h3>Participantes</h3>
                <PlayerList>
                    {players.map((player, index) => (
                        <li key={index}>
                            {currentPlayer !== index && <strong>⏳</strong>}
                            {currentPlayer === index && <strong>🎲</strong>}
                                {player.name === namePlayer && <strong> {player.name}  (Você)</strong>}
                                {player.name !== namePlayer && <strong>{player.name}</strong>}
                            <div style={{ color: player.color }}>Saldo: {player.balance.toFixed(2)}</div>
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
                            {playerStatus == "Sua vez, role os dados." && <Button onClick={handleThrowDice}>Lançar os dados</Button>}
                            <Dice faceValue={diceValue2} />
                        </div>
                    </CenterBox>
                </BoardContainer>
            </Column>
            <Column width="25%">
                <Button onClick={handleDeleteSession}>Encerrar Sessão</Button>
            <Historico>
                <h3>Historico</h3>
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
