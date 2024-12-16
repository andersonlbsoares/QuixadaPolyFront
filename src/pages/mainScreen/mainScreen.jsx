import * as React from "react";
import { useEffect, useState } from "react";
import { Container, Column, PlayerList, BoardContainer, CenterBox, Tile } from "./styles";
import Dice from "./Components/Dice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { tiles } from "./tiles.js";
console.log(tiles);
const MainScreen = () => {
    const navigate = useNavigate();
    const urlBack = process.env.REACT_APP_BACK_URL;

    // Place squares on the board perimeter

    const [players, setPlayers] = useState([]);

    let namePlyer = sessionStorage.getItem("namePlyer");
    let sessionId = sessionStorage.getItem("sessionId");

    useEffect(() => {
        if (!namePlyer || !sessionId) {
            navigate("/");
        }
    }, [namePlyer, sessionId, navigate]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`${urlBack}/sessao/${sessionId}`);
                setPlayers(response.data.players);
                console.log(players);
            } catch (error) {
                console.error("Erro ao buscar participantes:", error);
            }
        };

        fetchPlayers();
        const intervalId = setInterval(fetchPlayers, 3000);

        return () => clearInterval(intervalId);
    }, [sessionId]);

    const TileMap = () => {
        return tiles.map((tile) => {
            let position =
                tile.row == 11
                    ? "bottom"
                    : tile.col == 1
                    ? "left"
                    : tile.col == 11
                    ? "right"
                    : tile.row == 1
                    ? "top"
                    : undefined;
            return (
                <Tile
                    key={tile.name}
                    style={{
                        gridColumn: tile.col,
                        gridRow: tile.row,
                    }}
                    bgColor={tile.bgColor}
                    ownerColor={tile.owner_color}
                    position={position}
                >
                    <div className="tile-name">{tile.name}</div>

                    {!tile.special && (
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

    //     <Tile
    //     key={tile.name}
    //     style={{
    //         gridColumn: tile.col,
    //         gridRow: tile.row,
    //     }}
    //     bgColor={tile.bgColor}
    // >
    //     {tile.name}
    // </Tile>
    return (
        <Container>
            <Column width="25%">
                <h3>Participantes</h3>
                <PlayerList>
                    {players.map((player, index) => (
                        <li key={index}>
                            <strong>{player.name}</strong>
                            <div>Saldo: {player.balance}</div>
                        </li>
                    ))}
                </PlayerList>
            </Column>
            <Column width="50%">
                <BoardContainer>
                    <TileMap />
                    <CenterBox>
                        <div>
                            <Dice />
                            <Dice />
                        </div>
                    </CenterBox>
                </BoardContainer>
            </Column>
            <Column width="25%"></Column>
        </Container>
    );
};

export default MainScreen;
