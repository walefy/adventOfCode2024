const fs = require('fs');

const matrixInputString = fs.readFileSync('../inputs/input02.txt').toString();

function format2DMatrix(matrixString) {
  const matrix = matrixString.split('\n').map((row) => row.split(' '));

  return matrix;
}

function calcSafe(row) {
  let pivot = Number(row[0]);
  let nextValue = Number(row[1]);
  let safe = true;
  const order = pivot > nextValue ? 'desc' : 'asc';
  let canFail = true;

  let index = 0;
  while (nextValue) {
    pivot = Number(row[index]);
    nextValue = Number(row[index + 1]);

    if (!nextValue) {
      break;
    }

    const diff = Math.abs(pivot - nextValue);

    if ((order === 'desc' && pivot < nextValue) || (diff < 1 || diff > 3)) {
      if (canFail) {
        canFail = false;
        index++;
        continue;
      }

      safe = false;
      break;
    }

    if ((order === 'asc' && pivot > nextValue) || (diff < 1 || diff > 3)) {
      if (canFail) {
        canFail = false;
        index++;
        continue;
      }

      safe = false;
      break;
    }
    
    index++;
  }

  return safe;
}

const matrix = format2DMatrix(matrixInputString);

let sum = 0;

for (let index = 0; index < matrix.length; index++) {
  const array = matrix[index];
  const safe = calcSafe(array);

  if (safe) {
    sum++;
  }
}

console.log(sum);

// O(n)