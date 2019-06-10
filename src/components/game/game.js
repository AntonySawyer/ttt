import React from 'react';

import Board from '../board/board';
import GameControls from '../gameControls/gameControls';
import Status from '../status/status';
import { aiEasy } from '../../utils/aiEasy';
import checkWinner from '../../utils/checkWinner';
import './game.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(),
            lastMove: [],
            turn: 'X',
            aiMove: false,
            aiMark: 'O'
        };
    }

    makeMove(i) {
        const squares = [...this.state.squares];
        if (!(squares[i] || checkWinner(squares))) {
            squares[i] = this.state.turn;
            const lastMove = [...this.state.lastMove];
            lastMove.push(i);
            if (this.state.aiMove && this.state.aiMark !== this.state.turn) {
                const aiMove = aiEasy(squares);
                squares[aiMove] = this.state.aiMark;
                lastMove.push(aiMove);
            } else {
                this.changeTurn();
            }
            this.setState({squares: squares, 
                lastMove: lastMove
            });
        }
    }

    initAI() {
        this.setState({aiMove: document.querySelector('#easyComp').checked});
    }

    changeTurn() {
        const newTurn = (this.state.turn === 'X' ? 'O' : 'X');
        this.setState({turn: newTurn});
    }

    undoMove() {
        const newSquares = [...this.state.squares];
        if (this.state.aiMove) {
            newSquares[this.state.lastMove.pop()] = null;
            newSquares[this.state.lastMove.pop()] = null;
        } else {
            newSquares[this.state.lastMove.pop()] = null;
            this.changeTurn();
        }
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
        const isGameStarted = this.state.lastMove.length !== 0;

      return (
        <div className="game">
            <Status gameOver={winner} turn={this.state.turn} />
            <Board squares={this.state.squares} onClick={(i) => this.makeMove(i)} />
            <GameControls disabledControls={isGameStarted} 
                            changeOnClick={() => this.changeTurn()} 
                            undoOnClick={() => this.undoMove()} 
                            clearOnClick={() => this.clearField()} />
            <label>
                <input type="checkbox" id="easyComp" disabled={isGameStarted} onChange={() => this.initAI()} />
            easy AI
            </label>
        </div>
      );
    }
  }


