#!/usr/bin/env node
/* eslint no-param-reassign: 0 no-bitwise: 0 */
const { getRow, hashString } = require('../utils');

const hexToBin = hexChar => parseInt(hexChar, 16).toString(2).padStart(4, '0');

getRow()
  .then((data) => {

    const keyString = data;

    const grid = [...Array(128).keys()]
      .map(number =>
        [...hashString(`${keyString}-${number}`)]
          .map(hexToBin)
          .join(''))
      .map(row => [...row].map(char => parseInt(char, 2)));


    const part1 = () => {
      const result = grid
        .reduce((total, row) => total + row.reduce((rowSum, number) => rowSum + number, 0), 0);
      console.log(result);
    };


    const part2 = () => {

      const width = grid[0].length - 1;
      const height = grid.length - 1;

      const cleanRegion = (x, y) => {
        if (x < 0 || x > width || y < 0 || y > height || !grid[y][x]) {
          return;
        }

        grid[y][x] = 0;
        cleanRegion(x + 1, y);
        cleanRegion(x, y - 1);
        cleanRegion(x - 1, y);
        cleanRegion(x, y + 1);
      };

      let regions = 0;
      let y = 0;

      grid.forEach((row) => {
        let x = 0;
        row.forEach((char) => {
          if (char) {
            regions += 1;
            cleanRegion(x, y);
          }
          x += 1;
        });
        y += 1;
      });
      console.log(regions);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
