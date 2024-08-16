class CalculatorUI {
  #keys = document.querySelector('.calculator-keys');
  #activeScreen = document.querySelector('.active-display');
  #operationScreen = document.querySelector('.operation-display');
  #darkModeBtn = document.querySelector('.mode-btn');

  addEventHandlerKeys(handler) {
    this.#keys.addEventListener('click', handler);
  }

  addEventHandleDarkMode(handler) {
    this.#darkModeBtn.addEventListener('click', handler);
  }

  clearScreen() {
    this.#activeScreen.textContent = 0;
    this.#operationScreen.innerHTML = '';
  }

  updateActiveScreen(currentNumber) {
    this.#activeScreen.textContent = currentNumber;
  }

  updateOperationScreen(operation) {
    this.#operationScreen.innerHTML = operation;
  }
}

export default new CalculatorUI();
