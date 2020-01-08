import React from 'react';

import Board from '../board/board';
import GameControls from '../gameControls/gameControls';
import Enemies from '../enemies/enemeis';
import Status from '../status/status';
import { aiFirst, aiSecond, aiThird } from '../../utils/ai';
import checkWinner from '../../utils/checkWinner';
import { unsetClasses } from '../../utils/decorators';
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
    this.changeTurn = this.changeTurn.bind(this);
    this.undoMove = this.undoMove.bind(this);
    this.clearField = this.clearField.bind(this);
    this.initAI = this.initAI.bind(this);
  }

  makeMove(i) {
    const squares = [...this.state.squares];
    const winState = checkWinner(squares);
    const { aiMove, aiMark, turn } = this.state;
    if (!(squares[i] || winState)) {
      squares[i] = turn;
      const lastMove = [...this.state.lastMove];
      lastMove.push(i);
      if ( aiMove && aiMark !== turn && !winState ) {
        const aiMove = this.AITurn(squares);
        squares[aiMove] = aiMark;
        lastMove.push(aiMove);
      } else {
        this.changeTurn();
      }
      this.setState({
        squares, lastMove, gameInProgress: !Boolean(winState)
      });
    }
  }

  initAI() {
    const gameMode = document.querySelector('input[name=gameMode]:checked').id;
    this.setState({ aiMove: !(gameMode === 'human'), gameMode });
  }

  AITurn(squares) {
    const { gameMode, aiMark } = this.state;
    switch (gameMode) {
      case 'aiFirst':
        return aiFirst(squares);
      case 'aiSecond':
        return aiSecond(squares, aiMark);
      case 'aiThird':
        return aiThird(squares, aiMark);
      default:
        break;
    }
  }

  changeTurn() {
    const { turn, aiMark } = this.state;
    this.setState({ turn: aiMark, aiMark: turn });
  }

  undoMove() {
    const squares = [...this.state.squares];
    if (this.state.aiMove) {
      squares[this.state.lastMove.pop()] = null;
      squares[this.state.lastMove.pop()] = null;
    } else {
      squares[this.state.lastMove.pop()] = null;
      this.changeTurn();
    }
    this.setState({ squares });
    unsetClasses();
  }

  clearField() {
    this.setState({ squares: Array(9).fill(), lastMove: [] });
    unsetClasses();
  }

  render() {
    const winner = checkWinner(this.state.squares);
    const { turn, squares, gameInProgress } = this.state;

    return (
      <div className='game'>
        <Status gameOver={winner} turn={turn} />
        <Board squares={squares} onClick={i => this.makeMove(i)} />
        <GameControls
          disabledControls={gameInProgress}
          changeOnClick={this.changeTurn}
          undoOnClick={this.undoMove}
          clearOnClick={this.clearField}
        />
        <Enemies
          disabled={gameInProgress}
          onChange={this.initAI}
        />
      </div>
    );
  }
}
