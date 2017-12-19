#!/usr/bin/env node
const { getRows } = require('../utils');

getRows()
  .then((data) => {

    const programs = data
      .map((entry) => {
        const [, , ...children] = entry.split(' ');
        return children.map(child => parseInt(child.replace(',', ''), 10)); // '0' returns '0,' for some reason
      });

    const matching = [];
    let groups = 0;

    const getPrograms = (index) => {
      matching.push(index);

      if (programs[index]) {
        programs[index].forEach((program) => {
          if (matching.includes(program)) {
            return;
          }
          getPrograms(program);
        });
      }
    };

    getPrograms(0);

    console.log(matching.length);

  })
  .catch(err => console.log(`There was an error\n${err}`));
