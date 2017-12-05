const fs = require('fs');

const readFile = (fileName) => {
	return new Promise((resolve, reject) => {
		fs.readFile(`data/${fileName}.txt`, 'ascii', (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

module.exports.readFile = readFile;