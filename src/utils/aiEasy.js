const getAvailSquares = (arr) => arr.map((val, i) => val === undefined ? i : null).filter(val => val !== null);

export function aiEasy(arr) {
    const availSquares = getAvailSquares(arr);
    const randomIndex = Math.floor(availSquares.length * Math.random());
    return availSquares[randomIndex];
}
