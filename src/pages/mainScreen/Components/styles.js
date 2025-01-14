import styled from 'styled-components';

export const DiceContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
 transform: ${({ rotation }) => `rotateX(${rotation?.x || 0}deg) rotateY(${rotation?.y || 0}deg)`};
  transition: transform 0.5s ease;
  cursor: pointer;

`;
DiceContainer.defaultProps = {
  rotation: { x: 0, y: 0 },
};
export const Face = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #ffffff;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  font-weight: bold;
  color: #333;

  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.2);

  /* Estilos para posicionar cada face */
  &:nth-child(1) { transform: rotateY(0deg) translateZ(50px); }    // Frente
  &:nth-child(2) { transform: rotateY(180deg) translateZ(50px); }  // Trás
  &:nth-child(3) { transform: rotateY(90deg) translateZ(50px); }   // Direita
  &:nth-child(4) { transform: rotateY(-90deg) translateZ(50px); }  // Esquerda
  &:nth-child(5) { transform: rotateX(90deg) translateZ(50px); }   // Topo
  &:nth-child(6) { transform: rotateX(-90deg) translateZ(50px); }  // Base
`;
