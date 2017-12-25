#!/usr/bin/env node
/* eslint no-param-reassign: 0, no-return-assign: 0, no-confusing-arrow: 0 */
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const input = data.map(row => [...row.split('/')]).map(([a, b]) => [parseInt(a, 10), parseInt(b, 10)]);

    const isMatch = ([, lastEnd]) => (([start, end]) => (start === lastEnd) || (end === lastEnd));

    const generateBridges = function* (list, bridges = [], startPiece = [0, 0]) {
      const matches = list.filter(isMatch(startPiece));
      if (!matches.length) {
        yield [...bridges];
      }
      for (const match of matches) {
        const index = list.indexOf(match);
        list.splice(index, 1);
        bridges = [...bridges, match];
        yield* generateBridges(list, bridges, match);
        list.splice(index, 0, match);
        bridges.pop();
      }
    };

    const part1 = () => {

      bridges = [...generateBridges(input)];
      console.log(bridges);

    /*  matches.forEach((match, index) => {
        console.log('bri: ', bridges);
        console.log('2: ', match);
        [matches, list] = findMatch(list, match);
        console.log('3: ', matches);
        matches.forEach((match2) => {
          console.log(`matsch2: `, match2);
          [m3, list] = findMatch(list, match2);
          m3.forEach((m31) => {
           [m4, list] = findMatch(list, m31);
           m4.forEach((m41) => {
             console.log(`m41`, list.length)
             //bridges.push([match, match2, m31, m41]);
           })
          })  ;
        });
      });          */
/*

      while (findMatch(list, startPiece)) {

      }
      bridges = findMatches(list, startPiece);

      bridges = bridges.map(bridge => findMatches(list, bridge));
      console.log(JSON.stringify((bridges)));

*/
      /* input
        .filter(([a, b]) => (a === startPiece[1]) || b === startPiece[1])
        .map(([a, b]) => {
          if (a === startPiece[1]) {
            return [a, b];
          }
          if (b === startPiece[1]) {
            return [b, a];
          }
          return false;
        })
        .forEach((match) => {
          bridges = [...bridges, [startPiece, match]];
          startPieces = startPieces.filter(a => a !== match);
        });

      bridges.forEach(bridge => {
        startPiece = bridge[bridge.length - 1];
        startPieces
          .filter(([a, b]) => (a === startPiece[1]) || b === startPiece[1])
          .map(([a, b]) => {
            if (a === startPiece[1]) {
              return [a, b];
            }
            if (b === startPiece[1]) {
              return [b, a];
            }
            return false;
          })
          .forEach((match) => {
            bridges = [...bridges, [startPiece, match]];
            startPieces = startPieces.filter(a => a !== match);
          });
      });
      console.log(bridges);
      console.log(startPieces.length); */
    };

    const part2 = () => {
    };

    part1();
    part2();

  })
  .catch(err => console.log(`There was an error\n${err}`));
