#!/usr/bin/env node
/* eslint no-bitwise: 0, no-param-reassign: 0 */
const { getInput } = require('../utils');

getInput()
  .then((data) => {

    const input = [...Array(16).keys()].map(n => String.fromCharCode(n + 97));
    const danceMoves = data[0].split(',');

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

    const findAlreadySeenValue = (value, f) => {
      const seen = {};
      let i = 0;
      let key = value;
      while (seen[key] === undefined) {
        seen[key] = i;
        key = f(key);
        i += 1;
      }

      return [i, seen];
    };

    const part1 = () => console.log(dance(input).join(''));

    const part2 = () => {
      const [index, seen] = findAlreadySeenValue(input.join(''), value => dance(value).join(''));
      const position = (1000000000 - index) % index;
      console.log(Object.entries(seen).find((entry, i) => i === position)[0]);
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
