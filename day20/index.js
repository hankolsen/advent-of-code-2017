#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data.map((row, index) => {
      const [p, v, a] = row
        .split(', ')
        .map((coordinates) => {
          const [, x, y, z] = /[pva]=<(-?\d+),(-?\d+),(-?\d+)>/.exec(coordinates);
          return [x, y, z].map(num => parseInt(num, 10));
        });
      return [p, v, a, index];
    });

    const sumArrays = (a, b) => a.map((num, i) => parseInt(num, 10) + parseInt(b[i], 10));
    const manhattanDistance = ([x, y, z]) => Math.abs(x) + Math.abs(y) + Math.abs(z);

    const part1 = () => {
      const distance = [];
      let state = [...input];
      for (let i = 0; i < 1000; i += 1) {
        state = state.map(([p, v, a, index]) => {
          v = sumArrays(v, a);
          p = sumArrays(p, v);
          distance[index] = manhattanDistance(p);
          return [p, v, a, index];
        });
      }

      console.log(distance.indexOf(Math.min(...distance)));
    };

    const part2 = () => {
      let state = [...input];
      for (let tick = 0; tick < 1000; tick += 1) {
        const seen = {};
        state = state.map(([p, v, a, index]) => {
          v = sumArrays(v, a);
          p = sumArrays(p, v);
          if (!seen[p]) {
            seen[p] = [index];
          } else {
            seen[p].push(index);
          }
          return [p, v, a, index];
        });

        Object.values(seen)
          .filter(indices => indices.length > 1)
          .forEach((indices) => {
            indices.forEach((index) => {
              const duplicate = state.find(([, , , i]) => i === index);
              state.splice(state.indexOf(duplicate), 1);
            });
          });
      }
      console.log(state.length);

    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
