import * as React from 'react';
import { DiceContainer, Face } from './styles';
import { useState, useEffect } from 'react';

const Dice = ({ faceValue: externalFaceValue, onFaceValueChange }) => {
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [faceValue, setFaceValue] = useState(externalFaceValue || 1); 

    useEffect(() => {
        if (externalFaceValue !== undefined) {
            setFaceValue(externalFaceValue);
            const rotationsByFace = {
                1: { x: 0, y: 0 },         
                2: { x: 0, y: 180 },       
                3: { x: 0, y: -90 },        
                4: { x: 0, y: 90 },       
                5: { x: -90, y: 0 },        
                6: { x: 90, y: 0 },       
            };
            setRotation(rotationsByFace[externalFaceValue]);
        }
    }, [externalFaceValue]);

    const rollDice = () => {
        const newFaceValue = Math.floor(Math.random() * 6) + 1;
        setFaceValue(newFaceValue);
        onFaceValueChange && onFaceValueChange(newFaceValue);
        const rotationsByFace = {
            1: { x: 0, y: 0 },         
            2: { x: 0, y: 180 },       
            3: { x: 0, y: -90 },        
            4: { x: 0, y: 90 },       
            5: { x: -90, y: 0 },        
            6: { x: 90, y: 0 },       
        };
        setRotation(rotationsByFace[newFaceValue]);
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
