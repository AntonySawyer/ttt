import React from 'react';
import './square.css';

export default ({onClick, value}) => {
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
  }