#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRow } = require('../utils');

getRow()
  .then((data) => {

    const steps = parseInt(data, 10);
    const buffer = [0];
    let pos = 0;

    const part1 = () => {
      for (let value = 1; value <= 2017; value += 1) {
        pos = ((pos + steps) % buffer.length) + 1;
        buffer.splice(pos, 0, value);
      }
      console.log(buffer[pos + 1]);
    };


    const part2 = () => {
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
