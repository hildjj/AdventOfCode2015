import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = string[];

function after(s: string): string {
  return String.fromCodePoint(s.codePointAt(0)! + 1);
}

function part1(inp: Parsed): string {
  inp[4] = inp[3];
  inp[5] = after(inp[4]);
  inp[6] = after(inp[5]);
  inp[7] = inp[6];
  return inp.join('');
}

function part2(inp: Parsed): string {
  // Changed inp from part1
  inp[2] = after(inp[2]);
  return inp.slice(0, 3).join('') + 'aabcc';
}

export default async function main(args: MainArgs): Promise<[string, string]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
