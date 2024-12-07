const fs = require('fs');

const array01 = fs.readFileSync('./input01.txt').toString().split('\n');
const array02 = fs.readFileSync('./input01_list02.txt').toString().split('\n');

let sum = 0;

function calcFrequency(num) {
  let frequency = 0;

  for (const item of array02) {
    const value = Number(item);

    if (value === num) {
      frequency++;
    }
  }

  return frequency;
}

for (let index = 0; index < array01.length; index++) {
  const value = Number(array01[index]);
  const frequency = calcFrequency(value);

  sum += value * frequency;
}

console.log(sum);

// O(n * m)