import * as React from 'react';
import {Container, Row, Column, Casa, CenterArea, Board} from './styles';
import Dice from './Components/Dice';



const MainScreen = () => {
    const properties = {
        top: [
            { name: 'INÍCIO', corner: true },
            { name: 'Lion Square', color: '#8B4513', price: 60000 },
            { name: 'Cofre', special: true },
            { name: 'Praça da Estação', color: '#8B4513', price: 60000 },
            { name: 'Imposto', special: true },
            { name: 'RU', special: true },
            { name: 'China Brasil', color: '#87CEEB', price: 100000 },
            { name: 'Sorte', special: true },
            { name: 'Mac Lanches', color: '#87CEEB', price: 100000 },
            { name: 'Q-Pão', color: '#87CEEB', price: 120000 },
            { name: 'CADEIA', corner: true }
          ],
        right: [
          { name: 'Imperius Fitness', color: '#FF69B4', price: 140000 },
          { name: 'Auditório', special: true },
          { name: 'Zaut Fitness', color: '#FF69B4', price: 140000 },
          { name: 'Complexo One', color: '#FF69B4', price: 160000 },
          { name: 'Supermercado Pinheiro', color: '#FFA500', price: 180000 },
          { name: 'Sorte', special: true },
          { name: 'Supermercado Nosso Atacarejo', color: '#FFA500', price: 200000 },
          { name: 'Cofre', special: true },
          { name: 'Ginásio Rinaldo Róger', color: '#FF0000', price: 220000 }
        ],
        bottom: [
          { name: 'ESTACIONAMENTO', corner: true },
          { name: 'Pé na aréia', color: '#FF0000', price: 240000 },
          { name: 'Sorte', special: true },
          { name: 'UFC Campus Quixadá', color: '#FFD700', price: 260000 },
          { name: 'IFCE Quixadá', color: '#FFD700', price: 260000 },
          { name: 'Biblioteca', special: true },
          { name: 'UECE Quixadá', color: '#FFD700', price: 280000 },
          { name: 'Cofre', special: true },
          { name: 'Igreja Matriz', color: '#008000', price: 300000 },
          { name: 'Chalé da Pedra', color: '#008000', price: 300000 },
          { name: 'VÁ PARA CADEIA', corner: true }
        ],
        left: [
          { name: 'Mercado Central', color: '#008000', price: 320000 },
          { name: 'Pedra do Cruzeiro', color: '#00008B', price: 350000 },
          { name: 'Sala do CA', special: true },
          { name: 'Pedra da Galinha Choca', color: '#00008B', price: 350000 },
          { name: 'Sorte', special: true },
          { name: 'Imposto', special: true },
          { name: 'Rainha do Sertão', color: '#00008B', price: 400000 },
          { name: 'Cofre', special: true },
          { name: 'LUXO', special: true }
        ]
      };
    
      return (
        <Container>
            <Column width="25%">Participantes</Column>

            <Column width="50%">
                <Board>
                    <Row height="16.66%">
                    {properties.top.map((prop, i) => (
                        <Casa 
                        key={`top-${i}`}
                        corner={prop.corner}
                        color={prop.color}
                        style={{flex: prop.corner ? 1.5 : 1}}
                        >
                        {prop.name}
                        {prop.price && <div style={{fontSize: '0.6rem'}}>R$ {prop.price.toLocaleString()}</div>}
                        </Casa>
                    ))}
                    </Row>
                    <Row height="66.66%">
                    <Column width="16.66%">
                        {properties.left.map((prop, i) => (
                        <Casa 
                            key={`left-${i}`}
                            color={prop.color}
                        >
                            {prop.name}
                            {prop.price && <div style={{fontSize: '0.6rem'}}>R$ {prop.price.toLocaleString()}</div>}
                        </Casa>
                        ))}
                    </Column>
                    <CenterArea>
                        QuixadáPoly
                    </CenterArea>
                    <Column width="16.66%">
                        {properties.right.map((prop, i) => (
                        <Casa 
                            key={`right-${i}`}
                            color={prop.color}
                        >
                            {prop.name}
                            {prop.price && <div style={{fontSize: '0.6rem'}}>R$ {prop.price.toLocaleString()}</div>}
                        </Casa>
                        ))}
                    </Column>
                    </Row>
                    <Row height="16.66%">
                    {properties.bottom.map((prop, i) => (
                        <Casa 
                        key={`bottom-${i}`}
                        corner={prop.corner}
                        color={prop.color}
                        style={{flex: prop.corner ? 1.5 : 1}}
                        >
                        {prop.name}
                        {prop.price && <div style={{fontSize: '0.6rem'}}>R$ {prop.price.toLocaleString()}</div>}
                        </Casa>
                    ))}
                    </Row>
                </Board>
            </Column>
          
            <Column width="25%">
                <Dice />
            </Column>


        </Container>
      );
    };
    
    export default MainScreen;