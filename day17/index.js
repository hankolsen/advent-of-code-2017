#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getInput } = require('../utils');

getInput()
  .then((data) => {

    const steps = parseInt(data[0], 10);

    const step = (buffer, pos) => {
      const value = buffer[pos] + 1;
      const nextPos = ((pos + steps) % buffer.length) + 1;
      buffer.splice(nextPos, 0, value);
      return nextPos;

    };

    const part1 = () => {
      const buffer = [0];
      let pos = 0;
      while (buffer[pos] < 2017) {
        pos = step(buffer, pos);
      }
      console.log(buffer[pos + 1]);
    };

    const part2 = () => {
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
