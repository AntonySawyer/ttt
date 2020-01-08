const getAvailSquares = (arr) => arr.map((val, i) => (val === undefined || val ===  null) ? i : null).filter(val => val !== null);

const getPlMark = (aiMark) => {return aiMark === 'X' ? 'O' : 'X'};

export function aiFirst(arr) {
    const availSquares = getAvailSquares(arr);
    const randomIndex = Math.floor(availSquares.length * Math.random());
    return availSquares[randomIndex];
};

export function aiSecond(arr, aiMark, mode) {
    const plMark = getPlMark(aiMark);
    const winForAI = getWinPosition(arr, aiMark);
    const winForPL = getWinPosition(arr, plMark);
    const bestMoves = winForAI.concat(winForPL);
    const filteredBestMove = filterMoves(bestMoves, arr, aiMark, plMark);
    if (mode === 'aiThird') {
        return {winForAI: filterMoves(winForAI, arr, aiMark, plMark), winForPL: filterMoves(winForPL, arr, aiMark, plMark)}
    } else if (filteredBestMove.length !== 0) {
        return filteredBestMove[0];
    } else {
        return aiFirst(arr);
    }
};

const getWinPosition = (arr, mark) => {return checkRow(arr, mark).concat(checkColumn(arr, mark), checkDiogonal(arr, mark))};

const filterMoves = (bestMoves, arr, plMark, aiMark) => {return bestMoves.filter(move => arr[move] !== aiMark && arr[move] !== plMark)};

const checkRow = (arr, mark) => {
    const result = [];
    const targArr = arr.map(el => el !== mark ? 0 : 1);

    for (let i = 1; i < 9; i +=3) {
        if ((targArr[i-1] + targArr[i] + targArr[i+1]) === 2) {
            const targObj = {[targArr[i-1]]: i-1, [targArr[i]]: i, [targArr[i+1]]: i+1};
            let blankSq = targObj[0];
            result.push(blankSq);
        }
    }
    return result;
};

const checkColumn = (arr, mark) => {
    const result = [];
    const targArr = arr.map(el => el !== mark ? 0 : 1);
    for (let i = 0; i < 3; i++) {
        if ((targArr[i] + targArr[i+3] + targArr[i+6]) === 2) {
            const targObj = {[targArr[i]]: i, [targArr[i+3]]: i+3, [targArr[i+6]]: i+6};
            let blankSq = targObj[0];
            result.push(blankSq);
        }
    }
    return result;
};

const checkDiogonal = (arr, mark) => {
    const result = [];
    const targArr = arr.map(el => el !== mark ? 0 : 1);
    if ((targArr[0] + targArr[4] + targArr[8]) === 2) {
        const targObj = {[targArr[0]]: 0, [targArr[4]]: 4, [targArr[8]]: 8};
        let blankSq = targObj[0];
        result.push(blankSq);
    }
    if ((targArr[2] + targArr[4] + targArr[6]) === 2) {
        const targObj = {[targArr[2]]: 2, [targArr[4]]: 4, [targArr[6]]: 6};
        let blankSq = targObj[0];
        result.push(blankSq);
    }
    return result;
};

export function aiThird(arr, aiMark) {
    let availArr = getAvailSquares(arr);
    if (availArr.length >= 7) {
      return aiSecond(arr, aiMark);
    } else {
        const newArr = arr.slice(0);
        const bestMove = minimax(newArr, aiMark);
        console.log(bestMove);
        return bestMove.index;
    }
// console.log('aiThird');
//     if (getAvailSquares(arr).length > 7) {
//         return aiFirst(arr);
//     } else {
//         const plMark = getPlMark(aiMark);
//         const bestMoves = aiSecond(arr, aiMark, 'aiThird');
//         if (bestMoves.winForAI.length !== 0) {
//             return bestMoves.winForAI[0];
//         } else if (bestMoves.winForPL.length !== 0) {
//             return bestMoves.winForPL[0];
//         } else {
//             const newSquares = arr.slice(0);
//             newSquares[aiSecond(newSquares, aiMark)] = aiMark;
//             newSquares[aiSecond(newSquares, plMark)] = plMark;
//             return aiThird(newSquares, aiMark);
//         }
//     }
}


var huPlayer = "X";
var aiPlayer = "O";

function minimax(reboard, player) {
  let availArr = getAvailSquares(reboard);
  if (winning(reboard, huPlayer)) {
    return {
      score: -10
    };
  } else if (winning(reboard, aiPlayer)) {
    return {
      score: 10
    };
  } else if (availArr.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  console.log('moves:');
  console.log(moves);
  
  for (let i = 0; i < availArr.length; i++) {
    var move = {};
    move.index = availArr[i];
    reboard[availArr[i]] = player;

    if (player === aiPlayer) {
      var g = minimax(reboard, huPlayer);
      move.score = g.score;
      console.log('added for ' + player + ' adn move:');
      console.log(move);
    } else {
      var g = minimax(reboard, aiPlayer);
      move.score = g.score;
      console.log('added for ' + player + ' adn move:');
      console.log(move);
    }
    reboard[availArr[i]] = move.index;
    moves.push(move);
  }

moves.sort((a, b) => {return b.score - a.score});

//   var bestMove = moves[0].index;
  if (player === aiPlayer) {
    return moves[0];
    // let bestScore = 0;
    // for (var i = 0; i < moves.length; i++) {
    //   if (moves[i].score > bestScore) {
    //     bestScore = moves[i].score;
    //     bestMove = i;
    //   }
    // }
  } else {
    return moves[moves.length-1];
    // let bestScore = 0;
    // for (var i = 0; i < moves.length; i++) {
    //   if (moves[i].score < bestScore) {
    //     bestScore = moves[i].score;
    //     bestMove = i;
    //   }
    // }
  }
//   return moves[bestMove];
}


// winning combinations
function winning(board, player) {
  if (
    (board[0] === player && board[1] === player && board[2] === player) ||
    (board[3] === player && board[4] === player && board[5] === player) ||
    (board[6] === player && board[7] === player && board[8] === player) ||
    (board[0] === player && board[3] === player && board[6] === player) ||
    (board[1] === player && board[4] === player && board[7] === player) ||
    (board[2] === player && board[5] === player && board[8] === player) ||
    (board[0] === player && board[4] === player && board[8] === player) ||
    (board[2] === player && board[4] === player && board[6] === player)
  ) {
    return true;
  } else {
    return false;
  }
}
