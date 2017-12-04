#!/usr/bin/env node
const fs = require('fs');

fs.readFile('data/day4.txt', 'ascii', (err, data) => {

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

});