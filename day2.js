#!/usr/bin/env node
const { readFile } = require('./utils');
const _ = require('lodash');
require('lodash.combinations');

readFile('day2')
  .then(data => {

		const answer = data
			.split('\n')
			.map(line => line.split('\t'))
			.reduce((acc, cells) => acc + Math.max(...cells) - Math.min(...cells), 0);

		console.log(answer);

		const answer2 = data
			.split('\n')
			.map(line => line.split('\t'))
			.map(cells => _.combinations(cells, 2).find(pair => Math.max(...pair) % Math.min(...pair) === 0))
			.reduce((acc, pair) => acc + Math.max(...pair) / Math.min(...pair), 0);

		console.log(answer2);

})
	.catch(err => console.log(`There was an error\n${err}`));