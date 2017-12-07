
const sum = (data, halfway) => {
  const input = data.split('');
  const size = input.length;
  const distance = halfway ? size / 2 : 1;
  return input
    .filter((value, index, array) => value === array[(index + distance) % size])
    .reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
};

module.exports.sum = sum;
