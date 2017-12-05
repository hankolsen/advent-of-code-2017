const fs = require('fs');

const readFile = fileName => new Promise((resolve, reject) => {
  fs.readFile(`data/${fileName}.txt`, 'ascii', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data.split('\n'));
    }
  });
});


module.exports.readFile = readFile;
