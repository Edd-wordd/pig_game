'use strict';

let playerZeroTotalScore = document.querySelector('#score--0');
let playerOneTotalScore = document.querySelector('#score--1');
let playerZeroCurrentScore = document.querySelector('#current--0');
let playerOneCurrentScore = document.querySelector('#current--1');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let section = document.querySelector('section');
let dice = document.querySelector('.dice');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let btnNew = document.querySelector('.btn--new');

let currentScore, activePlayer, scores, playing;

const init = () => {
  playerZeroTotalScore.textContent = 0;
  playerOneTotalScore.textContent = 0;
  playerOneCurrentScore.textContent = 0;
  playerZeroCurrentScore.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const diceRoll = btnRoll.addEventListener('click', function () {
  if (playing) {
    let randomNum = Math.floor(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${randomNum}.png`;
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      dice.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
