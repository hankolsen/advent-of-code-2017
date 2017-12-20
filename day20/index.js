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

    console.log(input[0])
    const part2 = () => {
      let state = [...input];
      const seen = {};
      for (let i = 0; i < 50; i += 1) {
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
        const collisions = Object.entries(seen).filter(([, entries]) => entries.length > 1);
        if (collisions.length) {
          const [position, entries] = collisions[0] || [];

          console.log(position, entries);
          console.log(state[entries[0]], state[entries[1]]);
          state = state.splice(entries[0], 1);
        }
       /* Object.values(seen).forEach(pos => {
          console.log(state.length);
          state = state.splice(pos, 1);
        });*/
      }
      /*console.log(Object.values(seen).filter(id => id.length > 1));
      console.log(state[71]);
      console.log(state[72]);*/
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
