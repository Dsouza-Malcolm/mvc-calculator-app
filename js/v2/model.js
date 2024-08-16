export const state = {
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

export const handleNumber = (num) => {
  if (state.resultValue) {
    state.resultValue = null;
    state.currentValue = num;
    state.resetFlag = false;
    console.log(state);
    return;
  }
  if (state.resetFlag) {
    state.currentValue = num;
    state.resetFlag = false;
    console.log(state);
    return;
  }
  state.currentValue += num;
  console.log(state);
};

export const handleOperator = (operator) => {
  if (state.currentValue === '0') return;

  if (state.previousValue === state.currentValue) {
    state.operator = operator;
    console.log(state);
    return;
  }

  if (state.previousValue) {
    handleCalculation();
    state.operator = operator;
    state.currentValue = state.previousValue = state.resultValue;
    console.log(state);
    return;
  }
  if (operator !== state.operator) {
    state.operator = operator;
    state.previousValue = state.currentValue;
    state.resetFlag = true;
    console.log(state);
    return;
  }
};

export const handleDecimal = () => {
  if (state.currentValue.includes('.')) return;
  state.currentValue += '.';
  state.resetFlag = false;

  console.log(state);
};

export const handleSquare = () => {
  if (state.currentValue === '0') return;
  state.resultValue = state.currentValue;
  state.currentValue = state.currentValue ** 2;
  console.log(state);
};

export const handleSquareRoot = () => {
  if (state.currentValue === '0') return;

  state.resultValue = state.currentValue;
  state.currentValue = Math.sqrt(state.currentValue);
  console.log(state);
};

export const handleReciprocal = () => {
  if (state.currentValue === '0') return;

  state.resultValue = state.currentValue;
  state.currentValue = 1 / +state.currentValue;
  console.log(state);
};

export const handlePercentage = () => {
  if (state.currentValue === '0') return;

  state.currentValue = state.resultValue / 100;
  state.previousValue = state.currentValue;
  console.log(state);
};

export const toggleSign = () => {
  if (state.currentValue === '0') return;

  state.currentValue = state.toggleSignFlag
    ? state.currentValue.slice(1)
    : '-' + state.currentValue;

  state.toggleSignFlag = !state.toggleSignFlag;
};

export const handleCalculation = () => {
  const { currentValue, previousValue, operator } = state;
  switch (operator) {
    case '+':
      state.resultValue = +currentValue + +previousValue;
      break;
    case '-':
      state.resultValue = previousValue - currentValue;
      break;
    case '*':
      state.resultValue = +previousValue * +currentValue;
      break;
    case '/':
      state.resultValue = +previousValue / +currentValue;
      break;
    default:
      break;
  }
};

export const handleDelete = () => {
  state.currentValue =
    state.currentValue.length === 1 ? '0' : state.currentValue.slice(0, -1);
  if (state.currentValue === '0') state.resetFlag = true;
  console.log(state);
};

export const resetState = () => {
  state.currentValue = '0';
  state.previousValue = '';
  state.resultValue = 0;
  state.operator = null;
  state.resetFlag = true;
  state.operationDisplay = '';
  state.equalToFlag = false;
  console.log(state);
};
