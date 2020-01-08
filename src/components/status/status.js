import React from 'react';
import './status.css';

export default ({ gameOver, turn }) => {
  const status = (gameOver && (
    <p>
      Result: <span className='gameOver'>{gameOver}</span>
    </p>
  )) || <p>Next move: {turn}</p>;
  return <div className='gameStatus'>{status}</div>;
};
