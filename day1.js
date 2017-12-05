#!/usr/bin/env node
const { readFile } = require('./utils');

readFile('day1')
  .then((data) => {
    const size = data[0].length;
    const result = data[0]
      .split('')
      .filter((value, index, array) => value === array[(index + 1) % size])
      .reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);

    console.log(result);

    const result2 = data[0]
      .split('')
      .filter((value, index, array) => value === array[(index + (size / 2)) % size])
      .reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);

    console.log(result2);
  })
  .catch(err => console.log(`There was an error\n${err}`));
