export function unsetClasses() {
    document.querySelectorAll('.gameOver').forEach(el => el.classList.remove('gameOver'));
};

export function hightlightWinner(a, b, c) {
    const squaresDOM = document.querySelectorAll('.square');
    squaresDOM[a].classList.add('gameOver');
    squaresDOM[b].classList.add('gameOver');
    squaresDOM[c].classList.add('gameOver');
};
