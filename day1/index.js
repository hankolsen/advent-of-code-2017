#!/usr/bin/env node
const { getRow } = require('../utils');
const { sum } = require('./sum');

getRow()
  .then((data) => {
    console.log(`Part 1: ${sum(data)}`);
    console.log(`Part 2: ${sum(data, true)}`);
  })
  .catch(err => console.log(`There was an error\n${err}`));
