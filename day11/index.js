#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getInput } = require('../utils');

const hexDirections = {
  n: { x: 0, y: 1 },
  ne: { x: 1, y: 0 },
  se: { x: 1, y: -1 },
  s: { x: 0, y: -1 },
  sw: { x: -1, y: 0 },
  nw: { x: -1, y: 1 },
};

const manhattanDistanceHex = ({ x, y }) => {
  if (Math.sign(x) === Math.sign(y)) {
    return Math.abs(x + y);
  }
  return Math.max(Math.abs(x), Math.abs(y));
};

getInput()
  .then((data) => {

    const d =
      data[0]
        .split(',')
        .map(step => hexDirections[step])
        .reduce((totalSteps, distance) => {
          totalSteps.x += distance.x;
          totalSteps.y += distance.y;
          return totalSteps;
        }, { x: 0, y: 0 });

    console.log(manhattanDistanceHex(d));

  })
  .catch(err => console.log(`There was an error\n${err}`));
