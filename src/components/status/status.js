import React from 'react';

export default (props) => {
    const status = (props.gameOver && <p>Result of game - <span className="gameOver">{props.gameOver}</span></p>) 
                        || <p>Next move - {props.turn}</p>;
    return (
        <div className="gameStatus">{status}</div>
    )
}