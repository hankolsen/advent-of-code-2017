#!/usr/bin/env node
const { readFile } = require('./utils');

readFile('day4')
  .then((data) => {
    const numberOfUnique = data
      .split('\n')
      .map(line => line.split(' '))
      .filter(words => [...new Set(words)].length === words.length)
      .length;

    console.log(numberOfUnique);


    const numberOfNonAnagrams = data
      .split('\n')
      .map(line => line.split(' '))
      .map(words => words.map(word => word.split('').sort().join('')))
      .filter(words => [...new Set(words)].length === words.length)
      .length;

    console.log(numberOfNonAnagrams);
  })
  .catch(err => console.log(`There was an error\n${err}`));
