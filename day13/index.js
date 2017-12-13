#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getInput } = require('../utils');

getInput()
  .then((data) => {
    const input = {};
    data.forEach((row) => {
      const [depth, range] = row.split(': ');
      input[depth] = {
        range: parseInt(range, 10),
        direction: 1,
        scannerPosition: 0,
      };
    });

    const keys = Object.keys(input).map(key => parseInt(key, 10));
    const lastStep = Math.max(...keys);

    const moveScanners = (state) => {
      keys.forEach((key) => {
        const row = state[key];
        row.scannerPosition += row.direction;
        if (row.scannerPosition === row.range - 1) {
          row.direction = -1;
        }
        if (row.scannerPosition === 0) {
          row.direction = 1;
        }
      });
    };


    const part1 = () => {
      const state = { ...input };
      let currentPosition = 0;
      let caught = 0;

      const movePacket = () => {
        if (keys.includes(currentPosition)) {
          if (state[currentPosition].scannerPosition === 0) {
            caught += currentPosition * state[currentPosition].range;
          }
        }
        moveScanners(state);
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
