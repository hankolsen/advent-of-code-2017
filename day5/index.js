#!/usr/bin/env node
const { getRows } = require('../utils');

/* eslint-disable no-param-reassign */
const instructionStepper = (instructions, offsetter) => {
  const goal = instructions.length;
  let position = 0;
  let steps = 0;

  while (position < goal) {
    const offset = instructions[position];
    instructions[position] += offsetter(offset);
    position += offset;
    steps += 1;
  }

  return steps;
};


getRows()
  .then((data) => {
    const instructions = data.map(instruction => parseInt(instruction, 10));

    // Since we need the instructions untocuhed for the second step, pass in a clone of the array
    console.log(instructionStepper([...instructions], () => 1));
    console.log(instructionStepper([...instructions], offset => (offset > 2 ? -1 : 1)));
  })
  .catch(err => console.log(`There was an error\n${err}`));
