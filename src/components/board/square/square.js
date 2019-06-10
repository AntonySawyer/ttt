import React from 'react';
import './square.css';

export default (props) => {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }