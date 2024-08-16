const INITIAL_STATE = {
  currentValue: '0',
  previousValue: '',
  resultValue: null,
  operator: null,
  resetFlag: true,
  operationDisplay: '',
  equalToFlag: false,
  toggleSignFlag: false,
  DarkModeFlag: true,
};

export let state = { ...INITIAL_STATE };

const updateState = (newState) => {
  state = { ...state, ...newState };
  console.log(state);
};

export const handleNumber = (num) => {
  if (state.resultValue) {
    updateState({
      resultValue: null,
      currentValue: num,
      resetFlag: false,
    });
    return;
  }

  if (state.resetFlag) {
    updateState({
      currentValue: num,
      resetFlag: false,
    });
    return;
  }

  updateState({
    currentValue: state.currentValue + num,
  });
};

export const handleOperator = (operator) => {
  if (state.currentValue === '0') return;

  if (state.previousValue === state.currentValue) {
    updateState({ operator });
    return;
  }

  if (state.previousValue) {
    handleCalculation();
    updateState({
      operator,
      currentValue: state.resultValue,
      previousValue: state.resultValue,
    });
    return;
  }

  if (operator !== state.operator) {
    updateState({
      operator: operator,
      previousValue: state.currentValue,
      resetFlag: true,
    });
  }
};

export const handleDecimal = () => {
  if (state.currentValue.includes('.')) return;

  updateState({
    currentValue: state.currentValue + '.',
    resetFlag: false,
  });
};

export const handleSquare = () => {
  if (state.currentValue === '0') return;

  const squared = Math.pow(parseFloat(state.currentValue), 2);
  updateState({
    resultValue: state.currentValue,
    currentValue: squared.toString(),
  });
};

export const handleSquareRoot = () => {
  if (state.currentValue === '0') return;

  const sqRoot = Math.sqrt(parseFloat(state.currentValue));
  updateState({
    resultValue: state.currentValue,
    currentValue: sqRoot.toString(),
  });
};

export const handleReciprocal = () => {
  if (state.currentValue === '0') return;

  const reciprocal = 1 / parseFloat(state.currentValue);
  updateState({
    resultValue: state.currentValue,
    currentValue: reciprocal.toString(),
  });
};

export const handlePercentage = () => {
  if (
    state.currentValue === '0' ||
    state.resultValue === '0' ||
    !state.resultValue
  )
    return;

  const percentage = state.resultValue / 100;

  updateState({
    currentValue: percentage.toString(),
    previousValue: percentage.toString(),
  });
};

export const toggleSign = () => {
  if (state.currentValue === '0') return;

  const toggledValue = state.toggleSignFlag
    ? state.currentValue.slice(1)
    : '-' + state.currentValue;

  updateState({
    currentValue: toggledValue,
    toggleSignFlag: !state.toggleSignFlag,
  });
};

export const handleCalculation = () => {
  const { currentValue, previousValue, operator } = state;

  let result;
  switch (operator) {
    case '+':
      result = parseFloat(previousValue) + parseFloat(currentValue);
      break;
    case '-':
      result = parseFloat(previousValue) - parseFloat(currentValue);
      break;
    case '*':
      result = parseFloat(previousValue) * parseFloat(currentValue);
      break;
    case '/':
      result = parseFloat(previousValue) / parseFloat(currentValue);
      break;
    default:
      break;
  }

  updateState({ resultValue: result.toString() });
};

export const handleDelete = () => {
  const newValue =
    state.currentValue.length === 1 ? '0' : state.currentValue.slice(0, -1);

  updateState({
    currentValue: newValue,
    resetFlag: newValue === '0',
  });
};

export const resetState = () => {
  updateState({ ...INITIAL_STATE });
};
