#!/usr/bin/env node
const { getInput } = require('../utils');

getInput()
  .then((data) => {
    const banks = data[0].split('\t').map(char => parseInt(char, 10));
    const seenBanks = {};
    let lastSeen = banks.toString();

    while (!seenBanks[lastSeen]) {
      seenBanks[lastSeen] = Object.keys(seenBanks).length;
      let startValue = Math.max(...banks);
      let startPosition = banks.indexOf(startValue);
      banks[startPosition] = 0;

      while (startValue) {
        banks[(startPosition += 1) % banks.length] += 1;
        startValue -= 1;
      }
      lastSeen = banks.toString();
    }

    console.log(Object.keys(seenBanks).length, Object.keys(seenBanks).length - seenBanks[banks.toString()]);
  });
