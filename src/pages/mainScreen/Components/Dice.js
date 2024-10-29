import * as React from 'react';
import {DiceContainer, Face} from './styles';
import { useState } from 'react';

const Dice = () => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [faceValue, setFaceValue] = useState(1);
  
    const rollDice = () => {
        // Define um valor aleatório entre 1 e 6 para a face superior
        const newFaceValue = Math.floor(Math.random() * 6) + 1;
        setFaceValue(newFaceValue);
      
        // Define rotações específicas para que cada face fique na posição correta
        const rotationsByFace = {
          1: { x: 0, y: 0 },         // Frente
          2: { x: 0, y: 180 },       // Trás
          3: { x: 0, y: 90 },        // Direita
          4: { x: 0, y: -90 },       // Esquerda
          5: { x: 90, y: 0 },        // Topo
          6: { x: -90, y: 0 },       // Base
        };
      
        // Obtém a rotação com base no valor aleatório gerado
        const newRotation = rotationsByFace[newFaceValue];
        setRotation(newRotation);
      };
  
    return (
      <DiceContainer rotation={rotation} onClick={rollDice}>
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <Face key={value}>{value}</Face>
        ))}
        <p>Valor: {faceValue}</p>
      </DiceContainer>
    );
  };
  
  export default Dice;