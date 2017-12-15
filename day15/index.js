#!/usr/bin/env node
const { getInput } = require('../utils');

getInput()
  .then((data) => {

    const factorA = 16807;
    const multipleA = 4;
    const factorB = 48271;
    const multipleB = 8;
    const divisor = 2147483647;
    const [[, startValueA], [, startValueB]] = data.map(row => row.split('with '));

    const toBinary = value => value.toString(2).padStart(32, '0').slice(16, 32);

    const generate = (valueA, valueB) => [
      (valueA * factorA) % divisor,
      (valueB * factorB) % divisor,
    ];

    const part1 = () => {
      const pairs = {};
      let length = 40000000;
      let nextValueA = startValueA;
      let nextValueB = startValueB;

      while (length) {
        [nextValueA, nextValueB] = generate(nextValueA, nextValueB);

        const [binaryA, binaryB] = [nextValueA, nextValueB].map(toBinary);

        if (binaryA === binaryB) {
          pairs[binaryA] = pairs[binaryA] ? pairs[binaryA] += 1 : 1;
        }

        length -= 1;
      }
      const numberOfPairs = Object.values(pairs).reduce((sum, value) => sum + value, 0);
      console.log(numberOfPairs);
    };

    const part2 = () => {
      const pairs = {};
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
        const binA = toBinary(comparablesA[index]);
        const binB = toBinary(valueB);
        if (binA === binB) {
          pairs[binA] = pairs[binA] ? pairs[binA] += 1 : 1;
        }
      });

      const numberOfPairs = Object.values(pairs).reduce((sum, value) => sum + value, 0);
      console.log(numberOfPairs);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
