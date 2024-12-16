import styled from "styled-components";

export const PlayerList = styled.ul`
    list-style: none;
    padding: 0;

    li {
        padding: 10px;
        margin-bottom: 8px;
        background-color: #2a2a2a;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        transition: transform 0.2s ease;

        &:hover {
            transform: translateY(-5px);
            background-color: #383838;
        }
    }

    strong {
        color: #e0e0e0;
    }
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px;
    background-color: #121212;
    color: #fff;
    min-height: 100vh;
    font-family: "Arial", sans-serif;
`;

export const Row = styled.div`
    display: flex;
    height: ${(props) => props.height};
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => props.width};
`;

export const CenterArea = styled.div`
    flex: 1;
    background-color: #c8e6c9;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: bold;
    color: #2e7d32;
    text-transform: uppercase;
`;

export const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(11, 1fr);
    width: 900px;
    height: 900px;
    margin: 0 auto;
    background-color: #8c4ddd;
`;

export const Tile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid transparent;
    // border-top-color:

    border-${(props) => (props.position ? props.position : "top")}: 4px solid ${(props) =>
    props.ownerColor ? props.ownerColor : "transparent"};
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    font-size: 10px;
    text-align: center;
    background-color: ${(props) => props.bgColor || "#000"};
    font-weight: ${(props) => (props.price ? "normal" : "bold")};
    color: ${(props) => (props.ownerColor === "white" ? "black" : "white")};
    transition: all 0.3s ease;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;

    &:hover {
        transform: scale(1.05);
        z-index: 1;
        filter: invert(1);
    }

    .corner-indicator {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 8px;
        height: 8px;
        background-color: ${(props) => (props.corner ? "#FF5722" : "transparent")};
        border-radius: 50%;
    }

    .house-container {
        display: flex;
        justify-content: center;
        gap: 3px;
        margin-top: 4px;
    }

    .house {
        width: 10px;
        height: 10px;
        background-color: green;
        border-radius: 50%;
    }

    .hotel {
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 3px;
    }

    .tile-name {
        font-size: 0.9rem;
        font-weight: bold;
    }

    .tile-info {
        font-size: 0.7rem;
        margin-top: 4px;
    }

    .location-number {
        font-size: 0.8rem;
        font-weight: bold;
        margin-top: auto;
    }
`;

export const CenterBox = styled.div`
    grid-column: 4 / span 5;
    grid-row: 4 / span 5;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5c29d1;
    box-shadow: 2px 2px 4px rgba(0, 0, 1, 0.5);
`;
