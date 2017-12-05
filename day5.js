#!/usr/bin/env node
const { readFile } = require('./utils');

readFile('data/day5.txt')
	.then(data => {
		const instructions = data.split('\n').map(instruction => parseInt(instruction, 10));
		const instructions2 = [...instructions];

		const goal1 = instructions.length;
		const goal2 = instructions2.length;

		let steps = 0;
		let position = 0;

		while (position < goal1) {
			let oldPosition = position;
			position += instructions[position];
			instructions[oldPosition] += 1;
			steps += 1;
		}

		console.log(steps);

		steps = 0;
		position = 0;

		while (position < goal2) {
			let oldPosition = position;
			const offset = instructions2[position];
			position += offset;
			instructions2[oldPosition] += offset > 2 ? -1 : 1;
			steps += 1;
		}

		console.log(steps);

	})
	.catch(err => console.log(`There was an error\n${err}`));