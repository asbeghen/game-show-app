/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();

    this.objects = {
      phraseContainer: document.getElementById('phrase').querySelector('ul')
    };
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    let listMarkup = '';
    let className;

    for(let i = 0; i < this.phrase.length; i++) {
      className = (/^[a-zA-Z]$/).test(this.phrase[i]) ? `hide letter ${this.phrase[i]}` : 'space';
      listMarkup += `<li class="${className}"> ${this.phrase[i]} </li>`;
    }

    this.objects.phraseContainer.innerHTML = listMarkup;
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (letter) - Letter to display
   */
  showMatchedLetter(letter) {
    const letterPlaceholders = document.querySelectorAll('.letter');

    letterPlaceholders.forEach((placeholder, index) => {
      if (placeholder.textContent.includes(letter)) {
        placeholder.classList.remove('hide');
        placeholder.classList.add('show');
      }
    });
  }

  /**
   * Checks if passed letter is in phrase
   * @param (letter) - Letter to check
   */
  checkLetter(letter) {
    return this.phrase.includes(letter);
  }
}