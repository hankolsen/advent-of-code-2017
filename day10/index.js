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
  for (const length of lengths) {
    list = reverseSelection(list, currentPosition, length);
    currentPosition += length + skipSize;
    skipSize += 1;
  }
  return { result: list, currentPosition, skipSize };
};

getInput()
  .then((data) => {

    const part1 = () => {
      const list = [...Array(256).keys()];
      const lengths = data[0]
        .split(',')
        .map(char => parseInt(char, 10));

      const { result } = apply(list, lengths);
      console.log(result[0] * result[1]);
    };

    const part2 = () => {
      let list = [...Array(256).keys()];
      const lengths = [...[...data[0]].map(char => char.charCodeAt()), ...[17, 31, 73, 47, 23]];
      let currentPosition = 0;
      let skipSize = 0;

      for (let round = 0; round < 64; round += 1) {
        ({ result: list, currentPosition, skipSize } = apply(list, lengths, currentPosition, skipSize));
      }

      // Create XOR hash
      let hash = '';
      for (let i = 0; i < 16; i += 1) {
        const hashEntry = list
          .splice(0, 16)
          .reduce((a, b) => a ^ b)
          .toString(16);
        hash += (`0${hashEntry}`).slice(-2);
      }

      console.log(hash);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
