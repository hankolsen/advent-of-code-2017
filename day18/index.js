#!/usr/bin/env node
/* eslint no-param-reassign: 0, no-return-assign: 0, no-confusing-arrow: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data.map(row => [...row.split(' ')]);

    const get = (value, register) => Number.isNaN(parseInt(value, 10)) ? register[value] : parseInt(value, 10);
    const set = (position, getValue) => ({ register, currentRow }) =>
      ({ register: { ...register, [position]: getValue(register) }, currentRow: currentRow += 1 });

    const instructions = {
      set: (position, value) => set(position, register => get(value, register)),
      add: (position, value) => set(position, register => register[position] + get(value, register)),
      mul: (position, value) => set(position, register => register[position] * get(value, register)),
      mod: (position, value) => set(position, register => register[position] % get(value, register)),
      rcv: position => set(position, register => register.lastPlayed),
      jgz: (position, value) => ({ register, currentRow }) =>
        ({ register, currentRow: currentRow += get(position, register) > 0 ? get(value, register) : 1 }),
      snd: position => set('lastPlayed', register => register[position]),
    };


    function* generator(id) {
      let state = {
        register: { p: id },
        currentRow: 0,
      };

      while (state.currentRow < input.length) {
        const [instruction, position, value] = input[state.currentRow];
        if (instruction === 'rcv') {
          state.register.lastPlayed = yield;
          if (!state.register.lastPlayed) {
            break;
          }
        }
        state = instructions[instruction](position, value)(state);
        if (instruction === 'snd') {
          yield state.register.lastPlayed;
        }
      }
    }


    const part1 = () => {
      let state = { register: {}, currentRow: 0 };
      while (state.currentRow < input.length) {
        const [instruction, position, value] = input[state.currentRow];
        state = instructions[instruction](position, value)(state);
        if (instruction === 'rcv' && state.register[position] > 0) {
          break;
        }
      }
      console.log(state.register.lastPlayed);
    };

    const part2 = () => {
      const [generator0, generator1] = [0, 1].map(id => generator(id));
      let [queue0, queue1, result0, result1, counter] = [[], [], generator0.next(), generator1.next(), 0];

      while (!result0.done || !result1.done) {
        if (result0.value) {
          queue1 = [result0.value, ...queue1];
          result0 = generator0.next();
        } else {
          result0 = generator0.next(queue0.pop());
        }

        if (result1.value) {
          counter += 1;
          queue0 = [result1.value, ...queue0];
          result1 = generator1.next();
        } else {
          result1 = generator1.next(queue1.pop());
        }
      }

      console.log(counter);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
