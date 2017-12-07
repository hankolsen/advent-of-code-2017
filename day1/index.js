#!/usr/bin/env node
const { getInput } = require('../utils');
const { sum } = require('./sum');

getInput()
  .then((data) => {
    const input = data[0];

    console.log(`Part 1: ${sum(input)}`);
    console.log(`Part 2: ${sum(input, true)}`);
  })
  .catch(err => console.log(`There was an error\n${err}`));
