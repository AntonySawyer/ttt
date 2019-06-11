const getAvailSquares = (arr) => arr.map((val, i) => (val === undefined || val ===  null) ? i : null).filter(val => val !== null);

export function aiFirst(arr) {
    const availSquares = getAvailSquares(arr);
    const randomIndex = Math.floor(availSquares.length * Math.random());
    return availSquares[randomIndex];
}

export function aiSecond(arr, aiMark) {
    const plMark = (aiMark === 'X' ? 'O' : 'X');
    const winForAI = checkRow(arr, aiMark).concat(checkColumn(arr, aiMark), checkDiogonal(arr, aiMark));
    const winForPL = checkRow(arr, plMark).concat(checkColumn(arr, plMark), checkDiogonal(arr, plMark));
    const bestMoves = winForAI.sort((a,b) => Math.random()).concat(winForPL.sort((a,b) => Math.random()));
    const filteredBestMove = bestMoves.filter(move => arr[move] !== aiMark && arr[move] !== plMark);
    if (filteredBestMove.length !== 0) {
        return filteredBestMove[0];
    } else {
        return aiFirst(arr);
    }
}

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

