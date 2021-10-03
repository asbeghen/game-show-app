/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();
const overlay = document.getElementById('overlay');
const btnReset = document.getElementById('btn__reset');
const btnKey = document.querySelectorAll('.key');

// Start new game
btnReset.addEventListener('click', () => game.startGame());

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