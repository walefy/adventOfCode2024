const input = Deno.readTextFileSync('inputs/input05.txt');

type Role = {
  first: string;
  last: string;
};

const [roles, pages] = input.split('\n\n');

const rolesFormatted: Role[] = roles.split('\n').map((value) => {
  const [first, last] = value.split('|');

  return { first, last };
});

const pageList: string[][] = pages.split('\n').map((value) => value.split(','));

function checkValidPosition(row: string[]): boolean {
  for (let index = 0; index < row.length; index++) {
    const page = row[index];

    const lasts: string[] = rolesFormatted.reduce((acc, curr) => {
      if (curr.first === page) {
        return [...acc, curr.last];
      }

      return acc;
    }, [] as string[]);

    const slicedRow = row.slice(index + 1);
  
    for (const item of slicedRow) {
      if (!lasts.includes(item)) {
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
