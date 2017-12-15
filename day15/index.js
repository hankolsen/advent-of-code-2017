#!/usr/bin/env node
/* eslint no-bitwise: 0 */
const { getInput } = require('../utils');

getInput()
  .then((data) => {

    const factorA = 16807;
    const multipleA = 4;
    const factorB = 48271;
    const multipleB = 8;
    const divisor = 2147483647;
    const [[startValueA], [startValueB]] = data.map(row => /(\d+)/g.exec(row));

    const binaryCompare = (a, b) => (a & 0xFFFF) === (b & 0xFFFF);

    const generate = (valueA, valueB) => [
      (valueA * factorA) % divisor,
      (valueB * factorB) % divisor,
    ];

    const part1 = () => {
      let pairs = 0;
      let length = 40000000;
      let nextValueA = startValueA;
      let nextValueB = startValueB;

      while (length) {
        [nextValueA, nextValueB] = generate(nextValueA, nextValueB);

        if (binaryCompare(nextValueA, nextValueB)) {
          pairs += 1;
        }

        length -= 1;
      }
      console.log(pairs);
    };

    const part2 = () => {
      let pairs = 0;
      const comparablesA = [];
      const comparablesB = [];
      let nextValueA = startValueA;
      let nextValueB = startValueB;

      while (comparablesB.length <= 5000000) {
        [nextValueA, nextValueB] = generate(nextValueA, nextValueB);
        if (nextValueA % multipleA === 0) {
          comparablesA.push(nextValueA);
        }
        if (nextValueB % multipleB === 0) {
          comparablesB.push(nextValueB);
        }
      }

      comparablesB.forEach((valueB, index) => {
        const valueA = comparablesA[index];
        if (binaryCompare(valueA, valueB)) {
          pairs += 1;
        }
      });

      console.log(pairs);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
