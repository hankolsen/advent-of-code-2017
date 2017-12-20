#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data.map((row) => {
      const [p, v, a] = row
        .split(', ')
        .map((coordinates) => {
          const [, x, y, z] = /[pva]=<(-?\d+),(-?\d+),(-?\d+)>/.exec(coordinates);
          return [x, y, z].map(num => parseInt(num, 10));
        });
      return [p, v, a];
    });

    const sumArrays = (a, b) => a.map((num, i) => parseInt(num, 10) + parseInt(b[i], 10));
    const manhattanDistance = ([x, y, z]) => Math.abs(x) + Math.abs(y) + Math.abs(z);

    const part1 = () => {
      const distance = [];
      let state = [...input];
      for (let i = 0; i < 1000; i += 1) {
        state = state.map(([p, v, a], index) => {
          v = sumArrays(v, a);
          p = sumArrays(p, v);
          distance[index] = manhattanDistance(p);
          return [p, v, a];
        });
      }

      console.log(distance.indexOf(Math.min(...distance)));
    };

    const part2 = () => {
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
