document.addEventListener('DOMContentLoaded', () => {
  const game = document.querySelector('.game');
  const res = document.querySelector('.res');
  const btnGame = document.querySelector('.new-game');
  const fields = document.querySelectorAll('.field');
  let step = false;
  let count = 0;
  const circle = `<svg class="circle">
  <circle r="45" cx="58" cy="58" stroke="blue" stroke-width="10" fill="none" stroke-linecap="round"/></svg>`;
  const cross = `<svg class="cross">
  <line class="first" x1="15" y1="15" x2="100" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
  <line class="second" x1="100" y1="15" x2="15" y2="100" stroke="red" stroke-width="10" stroke-linecap="round" />
  </svg>`;

  function stepCross(target) {
    target.innerHTML = cross;
    target.classList.add('x');
    const crossAudio = new Audio('audio/cross.mp3');
    crossAudio.play();
    count++;
  }

  function stepZero(target) {
    target.innerHTML = circle;
    target.classList.add('o');
    const circleAudio = new Audio('audio/circle.mp3');
    circleAudio.play();
    count++;
  }

  function init(e) {
    if (
      !e.target.classList.contains('field') ||
      e.target.classList.contains('x') ||
      e.target.classList.contains('o')
    ) {
      return;
    }

    if (!step) {
      stepCross(e.target);
    } else {
      stepZero(e.target);
    }

    step = !step;
    win();
  }

  function newGame() {
    step = false;
    count = 0;
    res.innerText = '';
    fields.forEach((item) => {
      item.innerHTML = '';
      item.classList.remove('x', 'o', 'active');
    });
    game.addEventListener('click', init);
  }

  function win() {
    const comb = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < comb.length; i++) {
      const [a, b, c] = comb[i];
      if (
        fields[a].classList.contains('x') &&
        fields[b].classList.contains('x') &&
        fields[c].classList.contains('x')
      ) {
        setTimeout(() => {
          fields[a].classList.add('active');
          fields[b].classList.add('active');
          fields[c].classList.add('active');
          res.innerText = 'WINNER X';
        }, 1500);
        game.removeEventListener('click', init);
        return;
      } else if (
        fields[a].classList.contains('o') &&
        fields[b].classList.contains('o') &&
        fields[c].classList.contains('o')
      ) {
        setTimeout(() => {
          fields[a].classList.add('active');
          fields[b].classList.add('active');
          fields[c].classList.add('active');
          res.innerText = 'WINNER O';
        }, 1500);
        game.removeEventListener('click', init);
        return;
      }
    }

    if (count === 9) {
      res.innerText = 'THERE ARE NO WINNERS';
      game.removeEventListener('click', init);
    }
  }

  btnGame.addEventListener('click', newGame);
  game.addEventListener('click', init);
});
