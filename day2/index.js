#!/usr/bin/env node
const { getInput } = require('../utils');
const _ = require('lodash');
require('lodash.combinations');

getInput()
  .then((data) => {
    const answer = data
      .map(line => line.split('\t'))
      .reduce((acc, cells) => acc + (Math.max(...cells) - Math.min(...cells)), 0);

    console.log(answer);

    const answer2 = data
      .map(line => line.split('\t'))
      .map(cells => _.combinations(cells, 2).find(pair => Math.max(...pair) % Math.min(...pair) === 0))
      .reduce((acc, pair) => acc + (Math.max(...pair) / Math.min(...pair)), 0);

    console.log(answer2);
  })
  .catch(err => console.log(`There was an error\n${err}`));
