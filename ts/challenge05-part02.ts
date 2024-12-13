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

function sortArrayByRoles(row: string[]) {
  let index = 1;
  const arrayCopy = [...row];

  while(true) {
    if (index >= arrayCopy.length) {
      index = 1;
      continue;
    }

    const currItem = arrayCopy[index];
    const prevItem = arrayCopy[index - 1];
    const lasts: Set<string> = rolesFormatted.get(currItem) ?? new Set();

    if (lasts.has(prevItem)) {
      arrayCopy[index] = prevItem;
      arrayCopy[index - 1] = currItem;
    }

    if (checkValidPosition(arrayCopy)) break;

    index++;
  }

  return arrayCopy;
}

let sum = 0;

for (let index = 0; index < pageList.length; index++) {
  const row = pageList[index];

  const validationLine = checkValidPosition(row);

  if (!validationLine) {
    const shortedRow = sortArrayByRoles(row);
    const middleIndex = Math.floor(shortedRow.length / 2);
    sum += Number(shortedRow[middleIndex]);
  }
}

console.log(sum);

// algorítimo lento e ruim mas funciona XD