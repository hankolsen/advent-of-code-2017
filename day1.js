#!/usr/bin/env node
const { readFile } = require('./utils');

readFile('data/day1.txt')
  .then(data => {
    const size = data.length;
    const result = data
      .split('')
      .filter((value, index, array) => value === array[(index + 1) % size])
      .reduce((a, b) => parseInt(a) + parseInt(b), 0);

    console.log(result);

    const result2 = data
      .split('')
      .filter((value, index, array) => value === array[(index + size / 2) % size])
      .reduce((a, b) => parseInt(a) + parseInt(b), 0);

    console.log(result2);
})
  .catch(err => console.log(`There was an error\n${err}`));
