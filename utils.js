/* eslint no-param-reassign: 0, no-bitwise: 0  */
const fs = require('fs');


const getData = () => new Promise((resolve, reject) => {
  fs.readFile('data.txt', 'ascii', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const getRows = () => getData().then(data => data.split('\n'));

const getRow = () => getRows().then(data => data[0]);

const listSize = 256;

const applyLengths = (list, lengths, currentPosition = 0, skipSize = 0) => {
  lengths.forEach((length) => {
    list = [...list.slice(currentPosition), ...list.slice(0, currentPosition)];
    list = [...list.slice(0, length).reverse(), ...list.slice(length)];
    list = [...list.slice(-currentPosition), ...list.slice(0, -currentPosition)];
    currentPosition = (currentPosition + length + skipSize) % listSize;
    skipSize += 1;
  });
  return { result: list, currentPosition, skipSize };
};

const hashString = (str) => {
  let list = [...Array(listSize).keys()];
  const lengths = [...[...str].map(char => char.charCodeAt(0)), ...[17, 31, 73, 47, 23]];
  let currentPosition = 0;
  let skipSize = 0;

  Array(64).fill().forEach(() => {
    ({ result: list, currentPosition, skipSize } = applyLengths(list, lengths, currentPosition, skipSize));
  });

  // Create XOR hash
  let hash = '';
  Array(16).fill().forEach(() => {
    hash += list
      .splice(0, 16)
      .reduce((a, b) => a ^ b)
      .toString(16)
      .padStart(2, '0');
  });

  return hash;
};


module.exports = { applyLengths, getData, getRow, getRows, hashString };
