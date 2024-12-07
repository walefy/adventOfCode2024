const fs = require('fs');

const memory = fs.readFileSync('../inputs/input03.txt').toString();

const isDo = (pointer) => memory.substring(pointer, pointer + 4) === 'do()';
const isDont = (pointer) => memory.substring(pointer, pointer + 7) === 'don\'t()';
const isMult = (pointer) => memory.substring(pointer, pointer + 4) === 'mul(';

function parseMul(pointer) {
  let [left, right] = memory.substring(pointer, pointer + 12).split(',');

  if (!left || !right) {
    return null;
  }

  if (!left.includes('mul(') || !right.includes(')')) {
    return null;
  }
  
  left = Number(left.replace('mul(', ''));
  right = Number(right.split('').filter((c) => !Number.isNaN(+c)).join(''));

  if (Number.isNaN(left) || Number.isNaN(right)) {
    return null;
  }

  return [left, right];
}

function evalMemory() {
  let skipNextMul = false;
  let sum = 0;

  for (let index = 0; index < memory.length; index++) {
    if (isDo(index)) {
      skipNextMul = false;
      continue;
    }
    
    if (isDont(index)) {
      skipNextMul = true;
      continue;
    }

    if (isMult(index)) {
      const parsedMul = parseMul(index);

      if (!parsedMul || skipNextMul) {
        continue;
      }

      sum += parsedMul[0] * parsedMul[1];
    }
  }

  return sum;
}

console.log(evalMemory());

// O(n)
