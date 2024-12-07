const fs = require('fs');

const memory = fs.readFileSync('../inputs/input03.txt').toString();
const regex = /mul\(\d{1,3},\d{1,3}\)/g;

const matches = memory.match(regex);

const sum = matches.reduce((acc, curr) => {
  const [num1, num2] = curr.replaceAll('mul(', '').replaceAll(')', '').split(',');

  const mult = Number(num1) * Number(num2);

  return mult + acc;
}, 0);

console.log(sum);

// O(n)
