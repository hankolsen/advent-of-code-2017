#!/usr/bin/env node
/* eslint no-multi-spaces: 0 */
const { getRow } = require('../utils');

getRow(true)
  .then((data) => {

    let opens = 0;
    let points = 0;

    const input = data
      .replace(/!./g, '')         // Remove !
      .replace(/<.*?>/g, '');     // Remove garbage

    [...input]
      .forEach((char) => {
        if (char === '{') {
          opens += 1;
        } else if (char === '}') {
          points += opens;
          opens -= 1;
        }
      });

    console.log(points);

    const garbageCharacters =
      data
        .replace(/!./g, '')                       // Remove !
        .match(/<.*?>/g)                          // Find garbage
        .map(chars => chars.length - 2)           // Count garbage characters, excluding <>, on each place in the array
        .reduce((acc, count) => acc + count, 0);  // Sum all counts in the array

    console.log(garbageCharacters);


  })
  .catch(err => console.log(`There was an error\n${err}`));
