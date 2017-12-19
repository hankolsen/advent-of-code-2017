#!/usr/bin/env node
const { applyLengths, getRow, hashString } = require('../utils');


const listSize = 256;


getRow()
  .then((data) => {

    const part1 = () => {
      const list = [...Array(listSize).keys()];
      const lengths = data
        .split(',')
        .map(char => parseInt(char, 10));

      const { result } = applyLengths(list, lengths);
      console.log(result[0] * result[1]);
    };

    const part2 = () => {
      console.log(hashString(data));
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
