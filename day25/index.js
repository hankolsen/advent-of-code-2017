#!/usr/bin/env node
/* eslint no-param-reassign: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const rule = (writeValue, direction, nextState) => (tape, index) => {
      tape[index] = parseInt(writeValue, 10);
      return [index + direction, nextState];
    };

    const run = (rules, state, steps, index = 0) => {
      const tape = {};
      while (steps) {
        [index, state] = rules[`${state}${tape[index] || 0}`](tape, index);
        steps -= 1;
      }
      console.log(Object.values(tape).reduce((sum, a) => sum + a, 0));
    };

    const [startState] = data[0].match(/[A-Z]+(?=\.$)/);
    const [steps] = data[1].match(/\d+(?= steps\.$)/);

    const rules = [...data.slice(3)]
      .filter(row => row)
      .map((row, index, array) => array.splice(0, 9))
      .filter(row => row)
      .map(arr => arr.map(row => row.match(/[A-Z](?=[.:])|[01]|left|right/)[0]))
      .reduce((acc, [state, , value0, direction0, state0, , value1, direction1, state1]) => ({
        ...acc,
        [`${state}0`]: rule(value0, direction0 === 'left' ? -1 : 1, state0),
        [`${state}1`]: rule(value1, direction1 === 'left' ? -1 : 1, state1),
      }), {});


    const part1 = () => {
      run(rules, startState, steps);
    };

    part1();

  })
  .catch(err => console.log(`There was an error\n${err}`));
