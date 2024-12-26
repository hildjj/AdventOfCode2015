import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = [string, string][];

function part1(inp: Parsed): number {
  return inp.reduce((t, v) => t + v[0].length - v[1].length, 0);
}

function enc(s: string): string {
  let res = '"';
  for (const c of s) {
    switch (c) {
      case '\\':
        res += '\\\\';
        break;
      case '"':
        res += '\\"';
        break;
      default:
        res += c;
    }
  }
  res += '"';
  return res;
}

function part2(inp: Parsed): number {
  let tot = 0;
  for (const [orig] of inp) {
    tot += enc(orig).length;
    tot -= orig.length;
  }
  return tot;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
