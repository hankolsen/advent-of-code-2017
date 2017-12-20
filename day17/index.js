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
      let result = 0;
      for (let i = 1; i <= 50000000; i += 1) {
        pos = ((pos + steps) % i) + 1;
        if (pos === 1) {
          result = i;
        }
      }
      console.log(result);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
