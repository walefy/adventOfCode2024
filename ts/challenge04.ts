const XMAS = 'XMAS';
const REVERSE_XMAS = 'SAMX';

function formatMatrix(baseString: string) {
  return baseString.split('\n').map((row) => row.split(''));
}

function countXmasHorizontal(index: number, row: string[]): number {
  let xmasCount = 0;

  const leftXmas = row.slice(index - XMAS.length + 1, index + 1);
  const rightXmas = row.slice(index, index + XMAS.length);

  if (leftXmas.join('') === REVERSE_XMAS) {
    xmasCount++;
  }

  if (rightXmas.join('') === XMAS) {
    xmasCount++;
  }

  return xmasCount;
}

function countXmasVertical(
  position: number,
  rowPosition: number,
  matrix: Array<Array<string>>,
): number {
  let xmasBottom = matrix[rowPosition][position];

  for (let index = 1; index < XMAS.length; index++) {
    const bottomRow = matrix[rowPosition + index];

    if (bottomRow) {
      xmasBottom += bottomRow[position];
    }
  }

  if (xmasBottom === XMAS || xmasBottom === REVERSE_XMAS) {
    return 1;
  }

  return 0;
}

function countXmasDiagonal(
  position: number,
  rowPosition: number,
  matrix: Array<Array<string>>,
): number {
  const row = matrix[rowPosition];

  let xmasLeft = row[position];
  let xmasRight = row[position];
  let xmasCount = 0;

  for (let index = 1; index < XMAS.length; index++) {
    const currentRow = matrix[rowPosition + index];

    if (currentRow) {
      xmasLeft += currentRow[position + index];
      xmasRight += currentRow[position - index];
    }
  }

  if (xmasLeft === XMAS || xmasLeft === REVERSE_XMAS) {
    xmasCount++;
  }

  if (xmasRight === XMAS || xmasRight === REVERSE_XMAS) {
    xmasCount++;
  }

  return xmasCount;
}

function main() {
  const inputString = Deno.readTextFileSync('inputs/input04.txt');

  const matrix = formatMatrix(inputString);

  let xmasCount = 0;

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex];

    for (let letterIndex = 0; letterIndex < row.length; letterIndex++) {
      xmasCount += countXmasHorizontal(letterIndex, row);
      xmasCount += countXmasVertical(letterIndex, rowIndex, matrix);
      xmasCount += countXmasDiagonal(letterIndex, rowIndex, matrix);
    }
  }

  console.log(xmasCount);
}

main();

// r = rows
// c = columns
// O(r * c)
