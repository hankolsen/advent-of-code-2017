const fs = require('fs');

const getInput = () => new Promise((resolve, reject) => {
  fs.readFile('data.txt', 'ascii', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data.split('\n'));
    }
  });
});


module.exports.getInput = getInput;
