/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;

    this.objects = {
      overlay: document.getElementById('overlay'),
      hearts: document.querySelectorAll('.tries'),
      keys: document.querySelectorAll('.key'),
      phraseContainer: document.getElementById('phrase').querySelector('ul'),
      gameOverMsg: document.getElementById('game-over-message')
    };
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */
  createPhrases() {
    return [
      new Phrase('If Im not back in five minutes just wait longer'),
      new Phrase('Never argue with the data'),
      new Phrase('No matter where you go there you are'),
      new Phrase('I find your lack of faith disturbing'),
      new Phrase('Goonies never say die')
    ]
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    this.objects.overlay.style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)];
  }

  /**
   * Handles onscreen keyboard button clicks
   * @param (key) button - The clicked button element
   */
  handleInteraction(key) {
    key.disabled = true;

    if (this.activePhrase.checkLetter(key.textContent.toLowerCase())) {
      key.classList.add('chosen');
      this.activePhrase.showMatchedLetter(key.textContent.toLowerCase());

      if (this.checkForWin()) {
        this.gameOver(true);
      }
    } else {
      key.classList.add('wrong');
      this.removeLife();
    }
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    const count = this.missed++;

    if (count === 5) {
      this.gameOver(false);
    } else {
      this.objects.hearts[count].querySelector('img').src = './images/lostHeart.png';
    }
  }

  /**
   * Checks for winning move
   * @return {boolean} True if game has been won, false if game wasn't won
   */
  checkForWin() {
    const hiddenLetters = document.querySelectorAll('.letter.hide');
    return hiddenLetters.length === 0;
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    this.objects.overlay.style.display = 'flex';
    this.objects.overlay.className = '';

    if (gameWon) {
      this.objects.overlay.classList.add('win');
      this.objects.gameOverMsg.textContent = 'Woot! you guess the phrase!';
    } else {
      this.objects.overlay.classList.add('lose');
      this.objects.gameOverMsg.textContent = 'Sorry, try again.';
    }

    this.resetGame();
  }

  /**
   * Resets the game
   * Removes all letter placeholders (li),
   * resets On screen keyboard class,
   * resets heart image src to "live"
   */
  resetGame() {
    this.objects.phraseContainer.innerHTML = '';

    this.objects.keys.forEach((key, i) => {
      key.disabled = false;
      key.className = 'key';
    });

    this.objects.hearts.forEach((heart, i) =>
      heart.querySelector('img').src = './images/liveHeart.png');
  }
}