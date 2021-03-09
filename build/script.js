'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const sectionPlayer0El = document.querySelector('.player--0');
const sectionPlayer1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelectorAll('.fnc-close-modal');
const modalContent = document.querySelector('.modal-content');
const winnerModalSection = document.querySelector('.winner');
const winnerPlayer01 = document.querySelector('.winner-1');
const winnerPlayer02 = document.querySelector('.winner-2');

const winningScore = 100;

let totalScores, currentScore, activePlayer, playingState;

const init = function () {
  // Starting conditions - initialise game state

  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingState = true;

  playingState = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  sectionPlayer0El.classList.add('player--active');
  sectionPlayer1El.classList.remove('player--active');
};
init();

const getModal = function (modalClass) {
  if (modalClass) {
    return document.querySelector(`.${modalClass}`);
  } else {
    return document.querySelectorAll('.modal');
  }
};

const openModal = function (modal, winner) {
  getModal(modal).classList.remove('hidden');
  overlay.classList.remove('hidden');

  if (Number.isInteger(winner)) {
    modalContent.classList.add('hidden');
    winnerModalSection.classList.remove('hidden');
    if (winner === 0) {
      winnerPlayer01.classList.remove('hidden');
      winnerPlayer02.classList.add('hidden');
    } else if (winner === 1) {
      winnerPlayer02.classList.remove('hidden');
      winnerPlayer01.classList.add('hidden');
    }
  }
};
openModal('modal-rules');

const closeModals = function () {
  getModal().forEach(el => el.classList.add('hidden'));
  overlay.classList.add('hidden');
};

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Implement rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playingState) {
    //1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./images/dice-${dice}.png`;

    //3. Check for dice role
    if (dice !== 1) {
      // Add dice to the current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Active player lost his turn, switch active player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playingState) {
    totalScores[activePlayer] += currentScore;
    if (totalScores[activePlayer] >= winningScore) {
      // Active player wins
      playingState = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`score--${activePlayer}`).textContent =
        totalScores[activePlayer];
      diceEl.classList.add('hidden');

      // Show winning modal
      setTimeout(() => {
        openModal('modal-winner', activePlayer);
      }, 1300);
    } else {
      document.getElementById(`score--${activePlayer}`).textContent =
        totalScores[activePlayer];
      switchPlayer();
    }
  }
});

btnCloseModal.forEach(el => el.addEventListener('click', closeModals));
overlay.addEventListener('click', closeModals);

// Restart the game
btnNew.addEventListener('click', init);
