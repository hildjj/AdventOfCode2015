import { type MainArgs, parseFile } from './lib/utils.ts';
import { BinaryHeap } from '@std/data-structures';

type Parsed = [replacements: [from: string, to: string][], molecule: string];

function* replaceAll(
  replacements: [string, string][],
  w: string,
): Generator<string, undefined, undefined> {
  for (const [from, to] of replacements) {
    let start = 0;
    while (true) {
      const i = w.indexOf(from, start);
      if (i === -1) {
        break;
      }
      yield w.slice(0, i) + to + w.slice(i + from.length);
      start = i + 1;
    }
  }
}

function part1(inp: Parsed): number {
  const [replacements, molecule] = inp;
  const seen = new Set<string>();
  for (const w of replaceAll(replacements, molecule)) {
    seen.add(w);
  }
  return seen.size;
}

function part2(inp: Parsed): number {
  const [replacements, molecule] = inp;
  const back: [string, string][] = replacements
    .toSorted((a, b) => {
      // Move all of the non-backtrack rules to the front, so they always
      // get tried first.  Rn rules always reduce strongly.
      const arn = a[1].includes('Rn');
      const brn = b[1].includes('Rn');
      if (arn && brn) {
        return b[1].length - a[1].length;
      }
      if (arn) {
        return -1;
      }
      if (brn) {
        return 1;
      }

      // Rules that include themselves are always safe
      const ainc = a[1].includes(a[0]);
      const binc = b[1].includes(b[0]);
      if (ainc && binc) {
        return b[1].length - a[1].length;
      }
      if (ainc) {
        return -1;
      }
      if (binc) {
        return 1;
      }
      return 0;
    })
    .map(
      ([from, to]) => [to, from],
    );

  const q = new BinaryHeap<[string, number]>(
    (a, b) => a[0].length - b[0].length, // Shortest first
  );
  q.push([molecule, 0]);
  while (!q.isEmpty()) {
    const [w, count] = q.pop()!;
    if (w === 'e') {
      return count;
    }
    for (const x of replaceAll(back, w)) {
      q.push([x, count + 1]);
    }
  }

  return NaN;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
