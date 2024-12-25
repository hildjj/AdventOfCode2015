import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = string[][];

function part1(inp: Parsed): number {
  let count = 0;
  OUTER:
  for (const ss of inp) {
    let vowels = 0;
    let prev = '';
    let dup = false;
    for (const c of ss) {
      if ('aeiou'.includes(c)) {
        vowels++;
      }
      if (prev === c) {
        dup = true;
      }
      if (
        ((prev === 'a') && (c === 'b')) ||
        ((prev === 'c') && (c === 'd')) ||
        ((prev === 'p') && (c === 'q')) ||
        ((prev === 'x') && (c === 'y'))
      ) {
        continue OUTER;
      }
      prev = c;
    }

    if (dup && (vowels >= 3)) {
      count++;
    }
  }
  return count;
}

function part2(inp: Parsed): number {
  let count = 0;
  for (const ss of inp) {
    let prev1 = '0';
    let prev2 = '1';
    let p0 = false;
    let p1 = false;
    let which = 0;
    const pairs = new Map<string, number>();
    for (const c of ss) {
      // prev1 prev2 c
      if (!p0 && (c === prev1)) {
        // xyx or aaa
        p0 = true;
      }
      if (!p1) {
        const pair = `${prev2}${c}`;
        const offset = pairs.get(pair);
        if (offset !== undefined) {
          if (which > (offset + 1)) {
            p1 = true;
          }
        } else {
          pairs.set(pair, which);
        }
      }
      prev1 = prev2;
      prev2 = c;
      which++;
    }
    if (p1 && p0) {
      count++;
    }
  }
  return count;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
