#!/usr/bin/env node
/* eslint no-param-reassign: 0, no-return-assign: 0, no-confusing-arrow: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data.map(row => [...row.split(' ')]);

    const get = (value, register) => Number.isNaN(parseInt(value, 10)) ? register[value] || 0 : parseInt(value, 10);
    const set = (position, getValue) => ({ register, currentRow }) =>
      ({ register: { ...register, [position]: getValue(register) }, currentRow: currentRow += 1 });

    const instructions = {
      set: (position, value) => set(position, register => get(value, register)),
      sub: (position, value) => set(position, register => (register[position] || 0) - get(value, register)),
      mul: (position, value) => set(position, register => register[position] * get(value, register)),
      jnz: (position, value) => ({ register, currentRow }) =>
        ({ register, currentRow: currentRow += get(position, register) !== 0 ? get(value, register) : 1 }),
    };


    const part1 = () => {
      let state = { register: {}, currentRow: 0 };
      let count = 0;
      while (state.currentRow < input.length) {
        const [instruction, position, value] = input[state.currentRow];
        state = instructions[instruction](position, value)(state);
        if (instruction === 'mul') {
          count += 1;
        }
      }
      console.log(count);
    };

    const part2 = () => {
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
