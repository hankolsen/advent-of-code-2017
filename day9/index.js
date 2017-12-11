#!/usr/bin/env node
const { getInput } = require('../utils');

getInput(true)
  .then((data) => {

    let opens = 0;
    let points = 0;
    let garbage = false;

    [...data[0]]
      .filter((char, index, array) => {
        if (char === '!') {
          array.splice(index + 1, 1);
          return false;
        }
        return true;
      })
      .filter((char) => {
        if (char === '<') {
          garbage = true;
        } else if (char === '>') {
          garbage = false;
        }
        return !garbage;
      })
      .forEach((char) => {
        if (char === '{') {
          opens += 1;
        } else if (char === '}') {
          points += opens;
          opens -= 1;
        }
      });
    console.log(points);

  })
  .catch(err => console.log(`There was an error\n${err}`));
