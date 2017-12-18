#!/usr/bin/env node
/* eslint no-confusing-arrow: 0, no-return-assign: 0 */
const { getInput } = require('../utils');

getInput()
  .then((data) => {

    const input = data.map(row => [...row.split(' ')]);
    const register = {};
    let lastPlayed = '';
    let currentRow = 0;

    const getValue = value => Number.isNaN(parseInt(value, 10)) ? register[value] : parseInt(value, 10);

    const instructions = {
      set: (position, value) => (register[position] = getValue(value)),
      add: (position, value) => (register[position] += getValue(value)),
      mul: (position, value) => (register[position] *= getValue(value)),
      mod: (position, value) => (register[position] %= getValue(value)),
      rcv: (position) => {
        if (register[position] !== 0) {
          console.log(`rcv: ${lastPlayed}`);
        }
      },
      jgz: (position, value) => {
        if (register[position] > 0) {
          currentRow += (getValue(value) - 1);
        }
      },
      snd: position => (lastPlayed = register[position]),
    };

    const part1 = () => {
      while (true) {
        const [instruction, position, value] = input[currentRow];
        instructions[instruction](position, value);
        if (instruction === 'rcv' && register[position] > 0) {
          break;
        }
        currentRow += 1;
      }
    };

    const part2 = () => {
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
