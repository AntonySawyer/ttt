import React from 'react';
import Square from '../square/square';
import './board.css';

export default class Board extends React.Component {
  generateRow(row) {
    return (
      <div className="board-row">
        {<Square value={this.props.squares[row[0]]} onClick={() => this.props.onClick(row[0])} />}
        {<Square value={this.props.squares[row[1]]} onClick={() => this.props.onClick(row[1])} />}
        {<Square value={this.props.squares[row[2]]} onClick={() => this.props.onClick(row[2])} />}
      </div>
    )
  }

  render() {
    return (
      <div className="gameBoard">
        {[[0, 1, 2], [3, 4, 5], [6, 7, 8]].map(row => this.generateRow(row))}
      </div>
    );
  }
}
