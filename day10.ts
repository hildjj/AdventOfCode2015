import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = number[];

function expand(inp: Parsed, repeats: number): number {
  for (let i = 0; i < repeats; i++) {
    const next: number[] = [];
    let prev = NaN;
    let count = 0;
    for (const n of inp) {
      if (n !== prev) {
        if (count !== 0) {
          next.push(count);
          next.push(prev);
        }
        prev = n;
        count = 1;
      } else {
        count++;
      }
    }
    next.push(count);
    next.push(prev);
    inp = next;
  }
  return inp.length;
}

function part1(inp: Parsed): number {
  return expand(inp, 40);
}

function part2(inp: Parsed): number {
  return expand(inp, 50);
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
