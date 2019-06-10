import React from 'react';
import Square from './square/square';
import './board.css';

export default (props) => {
  return (
    <div className="gameBoard">
      {props.squares.map((sq, i) => <Square key={i} value={sq} onClick={() => props.onClick(i)} />)}
    </div>
  );
}
