import React from 'react';
import Board from '../board/board';
import GameControls from '../gameControls/gameControls';
import checkWinner from '../../utils/checkWinner';
import './game.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(),
            lastMove: [],
            turn: 'X'
        };
    }

    makeMove(i) {
        const squares = [...this.state.squares];
        if (!(squares[i] || checkWinner(squares))) {
            squares[i] = this.state.turn;
            const lastMove = [...this.state.lastMove];
            lastMove.push(i);
            this.setState({squares: squares, 
                            lastMove: lastMove
                        });
            this.changeTurn();
            console.log(squares.filter(i => i).length % 2 === 1);
        }
    }

    changeTurn() {
        this.setState({turn: (this.state.turn === 'X' && 'O') || 'X'});
    }

    undoMove() {
        if (this.state.lastMove.length !== 0) {
            this.changeTurn();
        }
        const newSquares = [...this.state.squares];
        newSquares[this.state.lastMove.pop()] = null;
        this.setState({squares: newSquares});
        this.unsetClasses();
    }

    clearField() {
        this.setState({squares: Array(9).fill(),
                        lastMove: [],
                        turn: 'X'
        });
        this.unsetClasses();
    }

    unsetClasses() {
        document.querySelectorAll('.gameOver').forEach(el => el.classList.remove('gameOver'));
    }

    render() {
        const winner = checkWinner(this.state.squares);
        const status = (winner && <p>Result of game - <span className="gameOver">{winner}</span></p>) 
                        || <p>Next move - {this.state.turn}</p>;

      return (
        <div className="game">
            <div className="gameStatus">{status}</div>
            <Board squares={this.state.squares} onClick={(i) => this.makeMove(i)} />
            <GameControls disabledControls={this.state.lastMove.length !== 0} 
                            changeOnClick={() => this.changeTurn()} 
                            undoOnClick={() => this.undoMove()} 
                            clearOnClick={() => this.clearField()} />
        </div>
      );
    }
  }


