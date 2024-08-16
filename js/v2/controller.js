import calculatorUI from './view.js';
import * as model from './model.js';

const KEYS = {
  OPERATOR: 'operator',
  CLEAR: 'clear',
  EQUAL_TO: 'equal-to',
  DELETE: 'del',
  DECIMAL: 'decimal',
  SQUARE: 'square',
  SQUARE_ROOT: 'square-root',
  TOGGLE_SIGN: 'toggle-sign',
  PERCENTAGE: 'percentage',
  RECIPROCAL: 'reciprocal',
};

const SPECIAL_OPERATORS = [
  KEYS.SQUARE,
  KEYS.SQUARE_ROOT,
  KEYS.RECIPROCAL,
  KEYS.PERCENTAGE,
];

const handleEqualTo = () => {
  const operation = `${model.state.previousValue} <span class="red-accent">${model.state.operator}</span> ${model.state.currentValue} =`;

  calculatorUI.updateOperationScreen(operation);
  calculatorUI.updateActiveScreen(model.state.resultValue);
};

const updateOperationScreen = (key) => {
  if (
    model.state.operator &&
    !SPECIAL_OPERATORS.includes(key) &&
    key !== KEYS.EQUAL_TO
  ) {
    const operation = `
      ${model.state.previousValue} <span class="red-accent">${model.state.operator}</span>
    `;
    calculatorUI.updateOperationScreen(operation);
  }
};

const handleSpecialOperation = (key) => {
  if (model.state.resultValue === '0' || !model.state.resultValue) return;

  const operationMap = {
    [KEYS.SQUARE]: () => `sqr(${model.state.resultValue})`,
    [KEYS.SQUARE_ROOT]: () => `&radic;(${model.state.resultValue})`,
    [KEYS.RECIPROCAL]: () => `1/(${model.state.resultValue})`,
    [KEYS.PERCENTAGE]: () => model.state.currentValue,
  };

  const operation = operationMap[key]();
  calculatorUI.updateOperationScreen(operation);
};

const controlKeys = (event) => {
  // Guard Clause
  if (event.target.classList.contains('calculator-keys')) return;

  const key = event.target.getAttribute('class');
  const { value } = event.target; // Number, operator or Special Key. Comes from Button value attribute

  const actionMap = {
    [KEYS.OPERATOR]: () => model.handleOperator(value),
    [KEYS.CLEAR]: () => {
      model.resetState();
      calculatorUI.clearScreen();
    },
    [KEYS.EQUAL_TO]: () => {
      model.handleCalculation();
      model.state.equalToFlag = true;
      handleEqualTo();
    },
    [KEYS.DELETE]: () => model.handleDelete(),
    [KEYS.DECIMAL]: () => model.handleDecimal(),
    [KEYS.SQUARE]: () => model.handleSquare(),
    [KEYS.SQUARE_ROOT]: () => model.handleSquareRoot(),
    [KEYS.TOGGLE_SIGN]: () => model.toggleSign(),
    [KEYS.RECIPROCAL]: () => model.handleReciprocal(),
    [KEYS.PERCENTAGE]: () => model.handlePercentage(),
    default: () => {
      if (model.state.equalToFlag) {
        model.resetState();
        calculatorUI.clearScreen();
      }
      model.handleNumber(value);
    },
  };

  (actionMap[key] || actionMap.default)();

  if (key === KEYS.EQUAL_TO) return;

  if (SPECIAL_OPERATORS.includes(key)) {
    handleSpecialOperation(key);
  }

  updateOperationScreen(key);
  calculatorUI.updateActiveScreen(model.state.currentValue);
};

const toggleDarkMode = (event) => {
  const button = event.target.closest('.mode-btn');
  if (!button) return;

  const type = event.target.getAttribute('class');
  const moonPath = button.querySelector('svg.moon path');
  const sunPath = button.querySelector('svg.sun path');

  const setLightMode = () => {
    document.documentElement.style.setProperty('--drk-black', '#fafafa');
    document.documentElement.style.setProperty('--lgt-black', '#fff');
    document.documentElement.style.setProperty('--white', '#000');

    moonPath.style.stroke = '#aaa';
    sunPath.style.stroke = '#000';

    model.state.DarkModeFlag = false;
  };

  const setDarkMode = () => {
    document.documentElement.style.setProperty('--drk-black', '#222831');
    document.documentElement.style.setProperty('--lgt-black', '#31363f');
    document.documentElement.style.setProperty('--white', '#eeeeee');

    moonPath.style.stroke = '#fff';
    sunPath.style.stroke = '#aaa';

    model.state.DarkModeFlag = true;
  };

  if (type === 'sun' && model.state.DarkModeFlag) {
    setLightMode();
  }
  if (type === 'moon' && !model.state.DarkModeFlag) {
    setDarkMode();
  }
};

const init = () => {
  calculatorUI.addEventHandlerKeys(controlKeys);
  calculatorUI.addEventHandleDarkMode(toggleDarkMode);
};

init();
