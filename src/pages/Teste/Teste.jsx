import React from "react";
import styled from "styled-components";

const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(11, 1fr);
    width: 600px;
    height: 600px;
    margin: 0 auto;
    background-color: #f3f3f3;
`;

const Tile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    font-size: 10px;
    text-align: center;
    background-color: ${(props) => props.bgColor || "#fff"};
`;

const CenterBox = styled.div`
    grid-column: 4 / span 5;
    grid-row: 4 / span 5;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fefefe;
    border: 2px solid #aaa;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

// Configuração de todas as casas ao redor do tabuleiro
const tiles = [
    // Linha de baixo (esquerda -> direita)
    { name: "GO", row: 11, col: 11, bgColor: "yellow" },
    { name: "Mediterranean", row: 11, col: 10 },
    { name: "Community Chest", row: 11, col: 9 },
    { name: "Baltic Avenue", row: 11, col: 8 },
    { name: "Income Tax", row: 11, col: 7 },
    { name: "Reading Railroad", row: 11, col: 6 },
    { name: "Oriental Avenue", row: 11, col: 5 },
    { name: "Chance", row: 11, col: 4 },
    { name: "Vermont Avenue", row: 11, col: 3 },
    { name: "Connecticut Ave", row: 11, col: 2 },
    { name: "Jail", row: 11, col: 1, bgColor: "#f00" },

    // Coluna esquerda (baixo -> cima)
    { name: "St. Charles Place", row: 10, col: 1 },
    { name: "Electric Company", row: 9, col: 1 },
    { name: "States Avenue", row: 8, col: 1 },
    { name: "Virginia Avenue", row: 7, col: 1 },
    { name: "Pennsylvania RR", row: 6, col: 1 },
    { name: "St. James Place", row: 5, col: 1 },
    { name: "Community Chest", row: 4, col: 1 },
    { name: "Tennessee Avenue", row: 3, col: 1 },
    { name: "New York Avenue", row: 2, col: 1 },
    { name: "Free Parking", row: 1, col: 1 },

    // Linha de cima (direita -> esquerda)
    { name: "Kentucky Avenue", row: 1, col: 2 },
    { name: "Chance", row: 1, col: 3 },
    { name: "Indiana Avenue", row: 1, col: 4 },
    { name: "Illinois Avenue", row: 1, col: 5 },
    { name: "B&O Railroad", row: 1, col: 6 },
    { name: "Atlantic Avenue", row: 1, col: 7 },
    { name: "Ventnor Avenue", row: 1, col: 8 },
    { name: "Water Works", row: 1, col: 9 },
    { name: "Marvin Gardens", row: 1, col: 10 },
    { name: "Go to Jail", row: 1, col: 11, bgColor: "#f00" },

    // Coluna direita (cima -> baixo)
    { name: "Pacific Avenue", row: 2, col: 11 },
    { name: "North Carolina", row: 3, col: 11 },
    { name: "Community Chest", row: 4, col: 11 },
    { name: "Pennsylvania Ave", row: 5, col: 11 },
    { name: "Short Line", row: 6, col: 11 },
    { name: "Chance", row: 7, col: 11 },
    { name: "Park Place", row: 8, col: 11 },
    { name: "Luxury Tax", row: 9, col: 11 },
    { name: "Boardwalk", row: 10, col: 11 },
];

const TileMap = () => {
    return tiles.map((tile) => (
        <Tile
            key={tile.name}
            style={{
                gridColumn: tile.col,
                gridRow: tile.row,
            }}
            bgColor={tile.bgColor}
        >
            {tile.name}
        </Tile>
    ));
};

const MonopolyBoard = () => {
    return (
        <BoardContainer>
            <TileMap />
            <CenterBox>
                <div>
                    <h3>It is Player 1's turn.</h3>
                    <button>Roll Dice</button>
                </div>
            </CenterBox>
        </BoardContainer>
    );
};

export default MonopolyBoard;
