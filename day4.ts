import { type MainArgs, parseFile } from './lib/utils.ts';
// deno-lint-ignore no-external-import
import { createHash } from 'node:crypto';

type Parsed = string;
const enc = new TextEncoder();

function part1(inp: Parsed): number {
  const orig = createHash('MD5');
  orig.update(enc.encode(inp));
  for (let i = 0; i < Infinity; i++) {
    const m = orig.copy();
    m.update(enc.encode(String(i)));
    const hash = m.digest();
    if ((hash[0] === 0) && (hash[1] === 0) && ((hash[2] & 0xf0) === 0)) {
      return i;
    }
  }
  return NaN;
}

function part2(inp: Parsed): number {
  const orig = createHash('MD5');
  orig.update(enc.encode(inp));
  for (let i = 0; i < Infinity; i++) {
    const m = orig.copy();
    m.update(enc.encode(String(i)));
    const hash = m.digest();
    if ((hash[0] === 0) && (hash[1] === 0) && (hash[2] === 0)) {
      return i;
    }
  }
  return NaN;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
