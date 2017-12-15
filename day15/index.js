#!/usr/bin/env node
const { getInput } = require('../utils');

getInput()
  .then((data) => {

    const factorA = 16807;
    const factorB = 48271;
    const divisor = 2147483647;
    let length = 40000000;
    const pairs = {};
    let [[, nextValueA], [, nextValueB]] = data.map(row => row.split('with '));

    const toBinary = value => value.toString(2).padStart(32, '0').slice(16, 32);

    const generate = (valueA, valueB) => [
      (valueA * factorA) % divisor,
      (valueB * factorB) % divisor,
    ];

    const part1 = () => {
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


    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
