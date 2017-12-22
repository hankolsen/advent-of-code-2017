#!/usr/bin/env node
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
