#!/usr/bin/env node
const { readFile } = require('./utils');

/* eslint-disable no-param-reassign */
const instructionStepper = (instructions, offsetter) => {
  const goal = instructions.length;
  let position = 0;
  let steps = 0;

  while (position < goal) {
    const oldPosition = position;
    const offset = instructions[position];
    instructions[oldPosition] += offsetter(offset);
    position += offset;
    steps += 1;
  }

  return steps;
};


readFile('day5')
  .then((data) => {
    const instructions = data.split('\n').map(instruction => parseInt(instruction, 10));

    // Since we need the instructions untocuhed for the second step, pass in a clone of the array
    console.log(instructionStepper([...instructions], () => 1));
    console.log(instructionStepper([...instructions], offset => (offset > 2 ? -1 : 1)));
  })
  .catch(err => console.log(`There was an error\n${err}`));
