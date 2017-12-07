#!/usr/bin/env node
const { readFile } = require('./utils');

readFile('day6')
  .then((data) => {
    const banks = data[0].split('\t').map(Number);
    const seenBanks = {};
    let turns = 0;

    do {
      seenBanks[banks.toString()] = true;
      const maxValue = Math.max(...banks);
      let numbersToSpread = maxValue;
      const startPosition = banks.indexOf(maxValue);
      let index = startPosition + 1;
      banks[startPosition] = 0;
      while (numbersToSpread) {
        if (index >= banks.length) {
          index = 0;
        }
        banks[index] += 1;
        numbersToSpread -= 1;
        index += 1;
      }
      turns += 1;
    } while (!seenBanks[banks.toString()]);

    console.log(turns);
  });
