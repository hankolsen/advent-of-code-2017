#!/usr/bin/env node
const { getInput } = require('../utils');

const rotate = (arr, count) => {
  count -= arr.length * Math.floor(count / arr.length);
  arr.push.apply(arr, arr.splice(0, count));
  return arr;
};

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

      const rotationOffset = (currentPosition + length) % list.length;
      console.log(`rotationOffset: ${rotationOffset}`);
      let rotatedList = rotate(list, rotationOffset);
      console.log(`Rotated list ${rotatedList}`);
      const reverseRotaionList = [...rotatedList.reverse().splice(0, length)];
      console.log(`reverseRotaionList ${reverseRotaionList}`);
      console.log(`reversed: ${[...rotate(list, -(currentPosition + length) % list.length)]}`);
      list = [...reverseRotaionList, ...rotate(list, -(currentPosition + length) % list.length)];
console.log(`list ${list}`);

      currentPosition += length + skipSize;
      skipSize += 1;
      listIndex += 1;
      console.log('\n');
    }

    console.log(list);
  })
  .catch(err => console.log(`There was an error\n${err}`));
