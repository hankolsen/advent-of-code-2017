#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRow } = require('../utils');

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

getRow()
  .then((data) => {

    let maxDistance = 0;
    let currentDistance = 0;

    data
      .split(',')
      .map(step => hexDirections[step])
      .reduce((totalSteps, distance) => {
        totalSteps.x += distance.x;
        totalSteps.y += distance.y;
        currentDistance = manhattanDistanceHex(totalSteps);
        maxDistance = Math.max(currentDistance, maxDistance);
        return totalSteps;
      }, { x: 0, y: 0 });

    console.log(currentDistance);
    console.log(maxDistance);

  })
  .catch(err => console.log(`There was an error\n${err}`));
