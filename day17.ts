import { Sequence } from './lib/sequence.ts';
import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = number[];
const TARGET = 150;

function part1(inp: Parsed): number {
  let tot = 0;
  for (let i = 2; i < inp.length - 1; i++) {
    for (const subset of new Sequence(inp).combinations(i)) {
      if (subset.reduce((t, v) => t + v) === TARGET) {
        tot++;
      }
    }
  }
  return tot;
}

function part2(inp: Parsed): number {
  for (let i = 2; i < inp.length - 1; i++) {
    let tot = 0;
    for (const subset of new Sequence(inp).combinations(i)) {
      if (subset.reduce((t, v) => t + v) === TARGET) {
        tot++;
      }
    }
    if (tot > 0) {
      return tot;
    }
  }
  return NaN;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
