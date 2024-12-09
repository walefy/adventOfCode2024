const MAS = 'MAS';
const REVERSE_MAS = 'SAM';

const isMas = (text: string) => text === MAS || text === REVERSE_MAS;

function formatMatrix(baseString: string) {
  return baseString.split('\n').map((row) => row.split(''));
}

function countXmasDiagonal(
  position: number,
  rowPosition: number,
  matrix: Array<Array<string>>,
): number {
  const topRow = matrix[rowPosition - 1];
  const row = matrix[rowPosition];
  const bottomRow = matrix[rowPosition + 1];

  if (!topRow || !row || !bottomRow) return 0;
  if (row[position] !== 'A') return 0;

  const mas1 = topRow[position - 1] + 'A' + bottomRow[position + 1];
  const mas2 = topRow[position + 1] + 'A' + bottomRow[position - 1];

  if (isMas(mas1) && isMas(mas2)) return 1;

  return 0;
}

function main() {
  const inputString = Deno.readTextFileSync('inputs/input04.txt');
  const matrix = formatMatrix(inputString);

  let xmasCount = 0;

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex];

    for (let letterIndex = 0; letterIndex < row.length; letterIndex++) {
      xmasCount += countXmasDiagonal(letterIndex, rowIndex, matrix);
    }
  }

  console.log(xmasCount);
}

main();
