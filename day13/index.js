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

    const movePacket = (delay = 0, breakOnCaught = false) => {
      let caught = false;
      let score = 0;
      let currentPosition = 0;

      while (currentPosition <= lastStep) {
        const range = Math.max(map[currentPosition], 0);
        if (range > 0) {
          const frequency = 2 * (range - 1);
          if ((currentPosition + delay) % frequency === 0) {
            score += currentPosition * range;
            caught = true;
            if (breakOnCaught) {
              break;
            }
          }
        }
        currentPosition += 1;
      }

      return { score, caught };
    };

    const part1 = () => {
      console.log(movePacket().score);
    };

    const part2 = () => {
      let delay = 0;
      while (movePacket(delay, true).caught) {
        delay += 1;
      }
      console.log(delay);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
