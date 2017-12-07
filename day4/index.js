#!/usr/bin/env node
const { getInput } = require('../utils');

const isValid = (passphrase, transformer) => {
  const words = passphrase
    .split(' ')
    .map(transformer);
  return [...new Set(words)].length === words.length;
};

getInput()
  .then((data) => {
    const numberOfUnique = data
      .filter(words => isValid(words, word => word))
      .length;

    console.log(numberOfUnique);

    const numberOfNonAnagrams = data
      .filter(words => isValid(words, word => [...word].sort().join('')))
      .length;

    console.log(numberOfNonAnagrams);
  })
  .catch(err => console.log(`There was an error\n${err}`));
