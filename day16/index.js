#!/usr/bin/env node
/* eslint no-bitwise: 0, no-param-reassign: 0 */
const { getInput } = require('../utils');

getInput()
  .then((data) => {

    const input = [...Array(16).keys()].map(n => String.fromCharCode(n + 97));
    const danceMoves = data[0].split(',');
    const cycles = {};

    const swap = (programs, a, b) => {
      [programs[a], [programs[b]]] = [programs[b], programs[a]];
      return programs;
    };

    const moves = {
      s: (programs, x) => [...[...programs.slice(-x)], ...[...programs.slice(0, (programs.length - x))]],
      x: (programs, a, b) => swap(programs, a, b),
      p: (programs, a, b) => swap(programs, programs.indexOf(a), programs.indexOf(b)),
    };

    const dance = start => danceMoves.reduce((programs, danceMove) => {
      const [, move, ...involved] = danceMove.match(/([sxp])(\w+)\/?(\w+)?/);
      return moves[move](programs, ...involved);
    }, start);


    const part1 = () => dance(input).join('');

    const findLoop = (programs) => {
      let i = 0;
      let key = programs.join('');
      while (cycles[key] === undefined) {
        cycles[key] = i;
        i += 1;
        key = dance(key).join('');
      }
      return i;
    };

    const part2 = () => {
      const index = findLoop(input);
      const position = (1000000000 - index) % index;
      console.log(Object.entries(cycles).find((entry, i) => i === position)[0]);
    };


    console.log(part1());

    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
