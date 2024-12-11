import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = number[][];

function part1(inp: Parsed): number {
  let tot = 0;
  for (const [l, w, h] of inp) {
    tot += (3 * l * w) + (2 * w * h) + (2 * h * l);
  }
  return tot;
}

function part2(inp: Parsed): number {
  let tot = 0;
  for (const [l, w, h] of inp) {
    tot += (2 * l) + (2 * w) + (l * w * h);
  }
  return tot;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  for (const box of inp) {
    box.sort((a, b) => a - b);
  }
  return [part1(inp), part2(inp)];
}
