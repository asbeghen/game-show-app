/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
const overlay = document.getElementById('overlay');
const btnReset = document.getElementById('btn__reset');
const btnKey = document.querySelectorAll('.key');

/**
 * Resets and initializes a new game
 */
let game;

const initNewGame = () => {
  game = new Game();
  game.resetGame();
  game.startGame();
}

// Start new game event listener
btnReset.addEventListener('click', () => initNewGame());

// Handle click event for on screen keyboard
btnKey.forEach((btn) => {
  btn.addEventListener('click', (e) => game.handleInteraction(e.target));
});

// Handle real keyboard event
document.addEventListener('keydown', (e) => {
  if (overlay.style.display === 'none') {
    btnKey.forEach((button) => {
      if (button.textContent === e.key && !button.disabled) {
        game.handleInteraction(button)
      }
    });
  }
});