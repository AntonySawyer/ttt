export default function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      document.querySelectorAll('.square')[a].classList.add('gameOver');
      document.querySelectorAll('.square')[b].classList.add('gameOver');
      document.querySelectorAll('.square')[c].classList.add('gameOver');
      return `${squares[a]} is win!`;
    }
  }

  if (squares.filter(item => item).length === 9) {
    return 'draw.';
}
  return false;
}
