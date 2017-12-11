#!/usr/bin/env node
const { getInput } = require('../utils');

const registry = {};

const parseInstruction = (instruction) => {
  const [register, operation, value, , comparatorRegister, condition, conditionValue] = [...instruction.split(' ')];

  return {
    action: {
      register,
      operation: operation === 'inc' ? 1 : -1,
      value: parseInt(value, 10),
    },
    test: {
      register: comparatorRegister,
      operation: condition,
      value: parseInt(conditionValue, 10),
    },
  };
};

const operations = {
  '<': (a, b) => a < b,
  '>': (a, b) => a > b,
  '<=': (a, b) => a <= b,
  '>=': (a, b) => a >= b,
  '!=': (a, b) => a !== b,
  '==': (a, b) => a === b,
};

let max = Number.MIN_VALUE;

const getRegistryValue = register => registry[register] || 0;

const testOperation = test => operations[test.operation](getRegistryValue(test.register), test.value);

const applyOperation = ({ action, test }) => {
  if (testOperation(test)) {
    registry[action.register] = getRegistryValue(action.register) + (action.value * action.operation);
    max = Math.max(max, registry[action.register]);
  }
};


getInput()
  .then((data) => {
    data
      .map(parseInstruction)
      .forEach(applyOperation);

    console.log(Math.max(...Object.values(registry)));
    console.log(max);
  })
  .catch(err => console.log(`There was an error\n${err}`));
