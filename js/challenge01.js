const fs = require('fs');

const array01 = fs.readFileSync('../inputs/input01.txt').toString().split('\n');
const array02 = fs.readFileSync('../inputs/input01_list02.txt').toString().split('\n');

array01.sort((a, b) => a - b);
array02.sort((a, b) => a - b);

let sum = 0;

for (let index = 0; index < array01.length; index++) {
  const valueOfArray01 = Number(array01[index]);
  const valueOfArray02 = Number(array02[index]);

  sum += Math.abs(valueOfArray01 - valueOfArray02);
}

console.log(sum);

// O(n log n)