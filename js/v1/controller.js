import calculatorUI from "./view.js";
import * as model from "./model.js";

const controlKeys = (e) => {
  // Guard Clause
  if (e.target.classList.contains("calculator-keys")) return;

  const key = e.target.getAttribute("class");
  const { value } = e.target; // Number, operator or Special Key. Comes from Button value attribute

  switch (key) {
    case "operator":
      model.handleOperator(value);
      break;

    case "clear":
      model.resetState();
      calculatorUI.clearScreen();
      break;

    case "equal-to":
      model.handleCalculation();
      model.state.equalToFlag = true;
      console.log(model.state);
      break;

    case "del":
      model.handleDelete();
      break;

    case "dot":
      model.handleDecimal();
      break;

    case "square":
      model.handleSquare();
      break;

    case "toggleSign":
      model.toggleSign();
      break;

    case "squareRoot":
      model.handleSquareRoot();
      break;

    case "percentage":
      model.handlePercentage();
      break;

    case "reciprocal":
      model.handleReciprocal();
      break;

    default:
      if (model.state.equalToFlag) {
        model.resetState();
        calculatorUI.clearScreen();
      }
      model.handleNumber(value);
      break;
  }

  if (
    key === "square" ||
    key === "squareRoot" ||
    key === "reciprocal" ||
    key === "percentage"
  ) {
    console.log(model.state);
    if (model.state.resultValue === "0" || !model.state.resultValue) return;
    const operation =
      key === "square"
        ? `sqr(${model.state.resultValue})`
        : key === "squareRoot"
        ? `&radic;(${model.state.resultValue})`
        : key === "reciprocal"
        ? `1/(${model.state.resultValue})`
        : model.state.currentValue;
    calculatorUI.updateOperationScreen(operation);
  }

  if (key === "equal-to") {
    const operation = `${model.state.previousValue} <span class="red-accent">${model.state.operator}</span> ${model.state.currentValue} =`;

    calculatorUI.updateOperationScreen(operation);
    calculatorUI.updateActiveScreen(model.state.resultValue);
    return;
  }

  if (
    model.state.operator &&
    key !== "equal-to" &&
    key !== "square" &&
    key !== "squareRoot" &&
    key !== "reciprocal" &&
    key !== "percentage"
  ) {
    const operation = `
      ${model.state.previousValue} <span class="red-accent">${model.state.operator}</span>
    `;
    calculatorUI.updateOperationScreen(operation);
  }

  calculatorUI.updateActiveScreen(model.state.currentValue);
};

const toggleDarkMode = (e) => {
  const { target } = e;
  const button = target.closest(".mode-btn");
  if (!button) return;
  const type = target.getAttribute("class");

  const moonPath = button.querySelector("svg.moon path");
  const sunPath = button.querySelector("svg.sun path");

  if (type === "sun") {
    if (!model.state.DarkModeFlag) return;

    document.documentElement.style.setProperty("--drk-black", "#fafafa");
    document.documentElement.style.setProperty("--lgt-black", "#fff");
    document.documentElement.style.setProperty("--white", "#000");

    moonPath.style.stroke = "#aaa";
    sunPath.style.stroke = "#000";

    model.state.DarkModeFlag = false;
  }
  if (type === "moon") {
    if (model.state.DarkModeFlag) return;

    document.documentElement.style.setProperty("--drk-black", "#222831");
    document.documentElement.style.setProperty("--lgt-black", "#31363f");
    document.documentElement.style.setProperty("--white", "#eeeeee");

    moonPath.style.stroke = "#fff";
    sunPath.style.stroke = "#aaa";

    model.state.DarkModeFlag = true;
  }
};

const init = () => {
  calculatorUI.addEventHandlerKeys(controlKeys);
  calculatorUI.addEventHandleDarkMode(toggleDarkMode);
};

init();
