#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getInput } = require('../utils');

getInput()
  .then((data) => {

    const steps = data[0];

    const step = (buffer, pos, value) => {
      const nextPos = (((steps % buffer.length) + pos) % buffer.length) + 1;
      buffer.splice(nextPos, 0, value);
      return nextPos;

    };

    const part1 = () => {
      const buffer = [0];
      let pos = 0;
      let value = 1;
      while (value < 2018) {
        pos = step(buffer, pos, value);
        value += 1;
      }
      console.log(buffer[pos + 1]);
    };

    const part2 = () => {
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
