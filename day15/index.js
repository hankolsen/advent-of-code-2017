#!/usr/bin/env node
/* eslint no-bitwise: 0, no-param-reassign: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const [[startValueA], [startValueB]] = data.map(row => /(\d+)/g.exec(row));

    const binaryCompare = (a, b) => ((a & 0xFFFF) === (b & 0xFFFF) ? 1 : 0);

    const generator = (value, factor, test = () => true) => {
      do {
        value = (value * factor) % 2147483647;
      } while (!test(value));

      return value;
    };

    function generatorComparator(valueA, valueB, length, testA = () => true, testB = () => true) {
      let pairs = 0;
      while (length) {
        valueA = generator(valueA, 16807, testA);
        valueB = generator(valueB, 48271, testB);
        pairs += binaryCompare(valueA, valueB);
        length -= 1;
      }
      return pairs;
    }


    const part1 = () => {
      const pairs = generatorComparator(startValueA, startValueB, 40000000);
      console.log(pairs);
    };


    const part2 = () => {
      const pairs = generatorComparator(startValueA, startValueB, 5000000, n => (n % 4) === 0, n => (n % 8) === 0);
      console.log(pairs);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
