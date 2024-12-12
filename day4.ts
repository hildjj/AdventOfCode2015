import { type MainArgs, parseFile } from './lib/utils.ts';
import { md5 } from '@takker/md5';

type Parsed = string;

function part1(inp: Parsed): number {
  for (let i = 0; i < Infinity; i++) {
    const hash = new Uint8Array(md5(`${inp}${i}`));
    if ((hash[0] === 0) && (hash[1] === 0) && ((hash[2] & 0xf0) === 0)) {
      return i;
    }
  }
  return NaN;
}

function part2(inp: Parsed): number {
  for (let i = 0; i < Infinity; i++) {
    const hash = new Uint8Array(md5(`${inp}${i}`));
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
