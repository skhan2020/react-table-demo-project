import styled from 'styled-components';

const darkPink = '#fd5876'

export const StyledButton = styled.button`
  min-width: ${props => props.minWidth || '100px'};
  height: 40px;
  margin: 10px;
  font-size: 1em;
  color: ${props => props.fontColor || 'white'};
  border-style: none;
  background-color: ${props => props.bgColor || 'green'};
  font-weight: bold;
  cursor: pointer;
`
StyledButton.displayName = 'StyledButton';


export const SelectionCountBox = styled.div`
  width: 100%;
  font-size: 1.1em;
  font-weight: bold;
  color: ${darkPink};
`
SelectionCountBox.displayName = 'SelectionCountBox';