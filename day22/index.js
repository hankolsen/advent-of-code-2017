#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data;
    const middle = Math.floor(input.length / 2);
    const key = (i, j) => `${i},${j}`;
    const parseLine = (row, index) => [...row].map((column, j) =>
      [key(index - middle, j - middle), '.W#F'.indexOf(column)]);
    const nodes0 = [].concat(...data.map(parseLine))
      .reduce((acc, [ij, v]) => Object.assign(acc, { [ij]: v }), {});

    console.log(nodes0);
    const turn = ([x, y], node) => {
      const delta = node ? 1 : -1;
      return [(x + delta) % 2, (y + delta) % 2];
    };

    const step = (map, position, direction) => {
      const node = map[position[0]][position[1]];
      direction = turn(direction, node);
      map[position[0]][position[1]] = !node;
      position = [position[0] + direction[0], position[1] + direction[1]];
      return [map, position, direction];

    };

    const part1 = () => {
      let [map, position, direction] = [nodes0, [0, 0], [0, -1]];
      for (let i = 1; i < 3; i += 1) {
        console.log(map[key(...position)])

      }


    };

    const part2 = () => {
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
