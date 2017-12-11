#!/usr/bin/env node
const { getInput } = require('../utils');

getInput()
  .then((data) => {
    const input = data[0].split(',').map(char => parseInt(char, 10));
    console.log(input);
  })
  .catch(err => console.log(`There was an error\n${err}`));
