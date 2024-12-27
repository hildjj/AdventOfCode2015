import { type MainArgs, parseFile } from './lib/utils.ts';

type Parsed = unknown;

function sum(ary: unknown[], red: boolean): number {
  return ary.map((v) => addNumbers(v, red)).reduce((t, v) => t + v);
}

function addNumbers(o: unknown, red: boolean): number {
  switch (typeof o) {
    case 'number':
      return o;
    case 'object':
      if (!o) {
        return 0;
      }
      if (Array.isArray(o)) {
        return sum(o, red);
      } else {
        if (red && (Object.values(o).some((v) => v === 'red'))) {
          return 0;
        }
        return sum(Object.values(o), red);
      }
    case 'string':
      break;
    default:
      throw new Error(`Unknown type: ${typeof o}`);
  }
  return 0;
}

function part1(inp: Parsed): number {
  return addNumbers(inp, false);
}

function part2(inp: Parsed): number {
  return addNumbers(inp, true);
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
