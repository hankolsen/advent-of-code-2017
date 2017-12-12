#!/usr/bin/env node
/* eslint no-param-reassign: 0 no-mixed-operators: 0 */
const { getInput } = require('../utils');

const reverseSelection = (list, currentPosition, length) => {
  const result = [...list];
  const arraySize = result.length;
  for (let n = 0; n < length; n += 1) {
    result[(n + currentPosition) % arraySize] = list[(currentPosition + length - n - 1) % arraySize];
  }
  return result;
};

const apply = (list, lengths, currentPosition = 0, skipSize = 0) => {
  while (lengths.length) {
    const length = lengths.shift();
    list = reverseSelection(list, currentPosition, length);
    currentPosition += length + skipSize;
    skipSize += 1;
  }
  return list;
};

getInput()
  .then((data) => {
    const lengths = data[0].split(',').map(char => parseInt(char, 10));
    const list = [...Array(256).keys()];

    const result = apply(list, lengths);
    console.log(result[0] * result[1]);
  })
  .catch(err => console.log(`There was an error\n${err}`));
