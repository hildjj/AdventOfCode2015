import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = string[];

function part1(inp: Parsed): number {
  let count = 0;
  for (const p of inp) {
    switch (p) {
      case '(':
        count++;
        break;
      case ')':
        count--;
        break;
    }
  }
  return count;
}

function part2(inp: Parsed): number {
  let count = 0;
  let pos = 1;
  for (const p of inp) {
    switch (p) {
      case '(':
        count++;
        break;
      case ')':
        count--;
        break;
    }
    if (count === -1) {
      break;
    }
    pos++;
  }
  return pos;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}