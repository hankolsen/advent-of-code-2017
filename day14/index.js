#!/usr/bin/env node
/* eslint no-param-reassign: 0 no-bitwise: 0 */
const { getInput, hashString } = require('../utils');

const hexToBin = hexChar => parseInt(hexChar, 16).toString(2).padStart(4, '0');

getInput()
  .then((data) => {

    const keyString = data[0];

    const binaryInputs = [...Array(128).keys()]
      .map(number =>
        [...hashString(`${keyString}-${number}`)]
          .map(hexToBin)
          .join(''));

    const part1 = () => {

      const result = binaryInputs
        .reduce((total, row) => total + [...row].reduce((rowSum, number) => rowSum + parseInt(number, 10), 0), 0);

      console.log(result);
    };

    const part2 = () => {

    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
