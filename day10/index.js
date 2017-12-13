#!/usr/bin/env node
/* eslint no-param-reassign: 0, no-mixed-operators: 0, no-bitwise: 0 */
const { getInput } = require('../utils');

const listSize = 256;

const apply = (list, lengths, currentPosition = 0, skipSize = 0) => {
  lengths.forEach((length) => {
    list = [...list.slice(currentPosition), ...list.slice(0, currentPosition)];
    list = [...list.slice(0, length).reverse(), ...list.slice(length)];
    list = [...list.slice(-currentPosition), ...list.slice(0, -currentPosition)];
    currentPosition = (currentPosition + length + skipSize) % listSize;
    skipSize += 1;
  });
  return { result: list, currentPosition, skipSize };
};

getInput()
  .then((data) => {

    const part1 = () => {
      const list = [...Array(listSize).keys()];
      const lengths = data[0]
        .split(',')
        .map(char => parseInt(char, 10));

      const { result } = apply(list, lengths);
      console.log(result[0] * result[1]);
    };

    const part2 = () => {
      let list = [...Array(listSize).keys()];
      const lengths = [...[...data[0]].map(char => char.charCodeAt()), ...[17, 31, 73, 47, 23]];
      let currentPosition = 0;
      let skipSize = 0;

      Array(64).fill().forEach(() => {
        ({ result: list, currentPosition, skipSize } = apply(list, lengths, currentPosition, skipSize));
      });

      // Create XOR hash
      let hash = '';
      Array(16).fill().forEach(() => {
        hash += list
          .splice(0, 16)
          .reduce((a, b) => a ^ b)
          .toString(16)
          .padStart(2, '0');
      });

      console.log(hash);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
