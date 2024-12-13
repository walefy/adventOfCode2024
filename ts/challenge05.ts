const input = Deno.readTextFileSync('inputs/input05.txt');

const [roles, pages] = input.split('\n\n');

const rolesFormatted: Map<string, Set<string>> = roles.split('\n').reduce((acc, curr) => {
  const [first, last] = curr.split('|');

  if (acc.has(first)) {
    const valuesSet = acc.get(first);

    if (!valuesSet) throw new Error('Set not found in reduce');

    valuesSet.add(last);
    return acc;
  }

  acc.set(first, new Set([last]));
  return acc;
}, new Map<string, Set<string>>());

const pageList: string[][] = pages.split('\n').map((value) => value.split(','));

function checkValidPosition(row: string[]): boolean {
  for (let index = 0; index < row.length; index++) {
    const page = row[index];

    const lasts: Set<string> = rolesFormatted.get(page) ?? new Set();

    const slicedRow = row.slice(index + 1);
  
    for (const item of slicedRow) {
      if (!lasts.has(item)) {
        return false;
      }
    }
  }

  return true;
}

let sum = 0;

for (let index = 0; index < pageList.length; index++) {
  const row = pageList[index];

  const validationLine = checkValidPosition(row);

  if (validationLine) {
    const middleIndex = Math.floor(row.length / 2);
    sum += Number(row[middleIndex]);
  }
}

console.log(sum);
