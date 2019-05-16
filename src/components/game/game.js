import React from 'react';
import Board from '../board/board';
import checkWinner from '../../utils/checkWinner';


export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(),
            lastMove: [],
            turn: 'X'
        };
    }

    handleClick(i) {
        const squares = [...this.state.squares];
        if (!(squares[i] || checkWinner(squares))) {
            squares[i] = this.state.turn;
            const lastMove = [...this.state.lastMove];
            lastMove.push(i);
            this.setState({squares: squares, 
                            lastMove: lastMove
                        });
            this.changeTurn();
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
            <div>
                <Board squares={this.state.squares} onClick={(i) => this.handleClick(i)} />
            </div>
            <div className="gameControls">
                <button disabled={this.state.lastMove.length !== 0} onClick={() => this.changeTurn()}>Change first player</button>
                <button onClick={() => this.undoMove()}>Undo</button>
                <button onClick={() => this.clearField()}>Clear</button>
            </div>
        </div>
      );
    }
  }
