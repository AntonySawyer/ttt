import React from 'react';
import Square from './square/square';
import './board.css';

export default ({squares, onClick}) => {
  return (
    <div className="gameBoard">
      {squares.map((value, index) => <Square key={index} value={value} onClick={() => onClick(index)} />)}
    </div>
  );
}
