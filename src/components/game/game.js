import React from 'react';

import Board from '../board/board';
import GameControls from '../gameControls/gameControls';
import Enemies from '../enemies/enemeis';
import Status from '../status/status';
import { aiFirst, aiSecond } from '../../utils/ai';
import checkWinner from '../../utils/checkWinner';
import './game.css';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(),
            lastMove: [],
            gameInProgress: false,
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
            if (this.state.aiMove && this.state.aiMark !== this.state.turn && !checkWinner(squares)) {
                const aiMove = this.AITurn(squares);
                squares[aiMove] = this.state.aiMark;
                lastMove.push(aiMove);
                } else {
                this.changeTurn();
            }
            this.setState({squares: squares, 
                lastMove: lastMove,
                gameInProgress: (!Boolean(checkWinner(squares)))
            });
        }
    }

    initAI() {
        const choosen = document.querySelector('input[name=gameMode]:checked');
        this.setState({aiMove: !(choosen.id === 'human'), 
                        gameMode: choosen.id});
    }

    AITurn(squares) {
        switch (this.state.gameMode) {
            case 'aiFirst':
                return aiFirst(squares);                
            case 'aiSecond':
                return aiSecond(squares, this.state.aiMark);
            default:
                break;
        }
    }

    changeTurn() {
        const oldTurn = this.state.turn;
        const oldAIMark = this.state.aiMark;
        this.setState({turn: oldAIMark, aiMark: oldTurn});
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
                        lastMove: []
        });
        this.unsetClasses();
    }

    unsetClasses() {
        document.querySelectorAll('.gameOver').forEach(el => el.classList.remove('gameOver'));
    }

    render() {
        const winner = checkWinner(this.state.squares);

      return (
        <div className="game">
            <Status gameOver={winner} turn={this.state.turn} />
            <Board squares={this.state.squares} onClick={(i) => this.makeMove(i)} />
            <GameControls disabledControls={this.state.gameInProgress}
                            changeOnClick={() => this.changeTurn()}
                            undoOnClick={() => this.undoMove()} 
                            clearOnClick={() => this.clearField()} />
            <Enemies disabled={this.state.gameInProgress} onChange={() => this.initAI()} />
        </div>
      );
    }
  }


