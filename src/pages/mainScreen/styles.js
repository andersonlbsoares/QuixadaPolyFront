import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e0e0e0;
`;

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  aspect-ratio: 1;
  width: min(90vh, 90vw);
  background-color: #c8e6c9;
  padding: 2px;
`;

export const Row = styled.div`
  display: flex;
  height: ${props => props.height};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width};
`;

export const Casa = styled.div`
    display: flex;
    flex: ${props => props.corner ? 1.5 : 1};
    background-color: ${props => props.color || 'white'};
    border: 1px solid #666;
    align-items: center;
    justify-content: center;
    padding: 5px;
    font-size: 0.7rem;
    text-align: center;
    font-weight: ${props => props.price ? 'normal' : 'bold'};
    color: ${props => props.color ? 'white' : 'black'};
    transition: all 0.3s ease;
    flex-direction: column;

&:hover {
  transform: scale(1.02);
  z-index: 1;
}
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
