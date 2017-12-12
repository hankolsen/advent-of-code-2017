#!/usr/bin/env node
const { getInput } = require('../utils');

getInput()
  .then((data) => {
    const input = data[0].split(',').map(char => parseInt(char, 10));
    let skipSize = 0;
    let currentPosition = 0;
    let listIndex = 0;

    let list = [...Array(5).keys()];

    for (let i = 0; i < 2; i += 1) {
      const length = input[listIndex];
      console.log(`CurrPos: ${currentPosition}`);
      console.log(`Length: ${length}`);
      console.log(`List: ${list}`);
      console.log(`Slice start ${currentPosition}, slice size ${(currentPosition + length) % list.length} + ${Math.max(0, currentPosition - 1)}`);

      const selection = [...list.slice(currentPosition, currentPosition + length), ...list.slice(0, Math.max(0, currentPosition - 1))];
      console.log(`Selection : ${selection}`);
      selection.reverse();
      console.log(`Reverse : ${selection}`);
      list = [...selection, ...list.slice(length)];
console.log(`list ${list}`);
      currentPosition += length + skipSize;
      skipSize += 1;
      listIndex += 1;
      console.log('\n');
    }


    console.log(list);
  })
  .catch(err => console.log(`There was an error\n${err}`));
