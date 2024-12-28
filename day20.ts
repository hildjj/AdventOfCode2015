import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = number;

function part1(inp: Parsed): number {
  const top = inp / 10;
  const c = Array.from({ length: top }, () => 10);
  for (let i = 2; i < top; i++) {
    for (let j = i; j < top; j += i) {
      c[j] += i * 10;
    }
  }
  for (let i = 1; i < top; i++) {
    if (c[i] > inp) {
      return i;
    }
  }
  return NaN;
}

function part2(inp: Parsed): number {
  const top = inp / 10;
  const c = Array.from({ length: top }, () => 11);
  for (let i = 2; i < top; i++) {
    for (let j = i, count = 0; j < top && count <= 50; j += i, count++) {
      c[j] += i * 11;
    }
  }
  for (let i = 1; i < top; i++) {
    if (c[i] > inp) {
      return i;
    }
  }
  return NaN;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
