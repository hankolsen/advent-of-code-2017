#!/usr/bin/env node
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const maze = ([x, y]) => data[y][x];

    const directions = {
      down: [0, 1],
      right: [1, 0],
      up: [0, -1],
      left: [-1, 0],
    };
    const step = ([x, y], [dx, dy]) => [x + dx, y + dy];
    const isALetter = position => maze(position).match(/\w+/);
    const endOfLine = position => maze(position).match(/[+\s]/);
    const possibleTurns = ([x, y]) => (x === 0 ? [directions.left, directions.right] : [directions.up, directions.down]);
    const turn = (position, direction) => possibleTurns(direction).find(newDirection => maze(step(position, newDirection)) !== ' ');

    let position = [data[0].indexOf('|'), 0];
    let [direction, foundLetters, steps] = [directions.down, '', 0];

    const part1 = () => {
      while (direction) {
        position = step(position, direction);
        steps += 1;
        if (isALetter(position)) {
          foundLetters += maze(position);
        }
        if (endOfLine(position)) {
          direction = turn(position, direction);
        }
      }

      console.log(foundLetters);
    };

    const part2 = () => {
      console.log(steps);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
