#!/usr/bin/env node
const { getInput } = require('../utils');

getInput()
  .then((data) => {
    const regexp = new RegExp(/(\w+)( \((\d+)\))?( -> ([\w, ]+))?/);
    const hash = {};

    const input = data.map(row => regexp.exec(row))
      .map(exp => ({
        name: exp[1],
        weight: exp[3] ? parseInt(exp[3], 10) : 0,
        children: exp[5] ? exp[5].split(', ') : [],
        parents: [],
      }));

    input.forEach((entry) => {
      hash[entry.name] = entry;
    });

    const tree = input.map((e) => {
      const entry = Object.assign({}, e);
      entry.children = entry.children.map(child => hash[child]);
      entry.children.map(child => child.parents.push(entry.name));
      return entry;
    });

    const root = tree.find(entry => !entry.parents.length);
    console.log(root.name);
  })
  .catch(err => console.log(`There was an error\n${err}`));
