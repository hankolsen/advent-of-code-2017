#!/usr/bin/env node
/* eslint no-param-reassign: 0, no-return-assign: 0, no-confusing-arrow: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data;

    const part1 = () => {
      console.log(input);
    };

    const part2 = () => {
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
