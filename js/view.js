class CalculatorUI {
  #keys = document.querySelector(".calculator-keys");
  #activeScreen = document.querySelector(".active-display");
  #operationScreen = document.querySelector(".operation-display");
  #darkModeBtn = document.querySelector(".mode-btn");

  addEventHandlerKeys(handler) {
    this.#keys.addEventListener("click", (e) => {
      handler(e);
    });
  }

  addEventHandleDarkMode(handler) {
    this.#darkModeBtn.addEventListener("click", handler);
  }

  clearScreen() {
    this.#activeScreen.textContent = 0;
    this.#operationScreen.innerHTML = "";
  }

  updateActiveScreen(currentNumber) {
    this.#activeScreen.textContent = currentNumber;
  }

  updateOperationScreen(operation) {
    this.#operationScreen.innerHTML = operation;
  }

  // updateResult(num) {}
}

export default new CalculatorUI();
