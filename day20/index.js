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
    const step = ([p, v, a, i], fn) => {
      v = sumArrays(v, a);
      p = sumArrays(p, v);
      fn(p, i);
      return [p, v, a, i];
    };

    const part1 = () => {
      const distance = [];
      let state = [...input];
      for (let tick = 0; tick < 1000; tick += 1) {
        state = state.map(row => step(row, ((p, i) => { distance[i] = manhattanDistance(p); })));
      }

      console.log(distance.indexOf(Math.min(...distance)));
    };

    const part2 = () => {
      let state = [...input];
      for (let tick = 0; tick < 1000; tick += 1) {
        const seen = {};
        state = state.map(row => step(row, ((p, i) => { !seen[p] ? seen[p] = [i] : seen[p].push(i); })));

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
