#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getInput } = require('../utils');

getInput()
  .then((data) => {
    const input = data.map((row) => {
      const [depth, range] = row.split(': ');
      return { depth, range: parseInt(range, 10) };
    });

    const map = input.reduce((obj, item) => Object.assign(obj, { [item.depth]: item.range }), {});
    const keys = Object.keys(map);
    const lastStep = Math.max(...keys);

    const part1 = () => {
      let currentPosition = 0;
      let caught = 0;

      const movePacket = () => {
        const range = map[currentPosition] ? map[currentPosition] : 0;
        if (range > 0) {
          const frequency = 2 * (range - 1);
          if (currentPosition % frequency === 0) {
            caught += currentPosition * range;
          }
        }
        currentPosition += 1;
        while (currentPosition <= lastStep) {
          movePacket();
        }
      };

      movePacket();
      console.log(caught);
    };

    part1();

  })
  .catch(err => console.log(`There was an error\n${err}`));
