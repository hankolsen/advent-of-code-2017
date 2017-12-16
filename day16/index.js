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

    const spin = (options = { }) => {
      let { programs, involved: x } = options;
      x %= programs.length;
      programs = [
        ...[...programs.slice(-x)],
        ...[...programs.slice(0, x)],
        ...[...programs.slice(x, (programs.length - x))],
      ].slice(0, programs.length);
      return programs;
    };

    const exchange = ({ programs, involved }) => {
      const [a, b] = involved.split('/');
      return swap(programs, a, b);
    };

    const partner = ({ programs, involved }) => {
      const [a, , b] = [...involved];
      return swap(programs, programs.indexOf(a), programs.indexOf(b));
    };

    const moves = {
      s: spin,
      x: exchange,
      p: partner,
    };

    const dance = (danceMove, programs) => {
      const [move, ...involved] = [...danceMove];
      programs = moves[move]({
        programs,
        involved: involved.join(''),
      });
      return programs;
    };

    const part1 = () => {
      let programs = input;
      danceMoves.forEach((danceMove) => {
        programs = dance(danceMove, programs);
      });
      console.log(programs.join(''));
    };


    const part2 = () => {

    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
