import { type MainArgs, parseFile } from './lib/utils.ts';

const TARGET = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

interface Sue {
  sue: number;
  compounds: Map<keyof typeof TARGET, number>;
}
type Parsed = Sue[];

function part1(inp: Parsed): number {
  OUTER1:
  for (const sue of inp) {
    for (const [k, v] of sue.compounds) {
      if (TARGET[k] !== v) {
        continue OUTER1;
      }
    }
    return sue.sue;
  }
  return NaN;
}

function part2(inp: Parsed): number {
  OUTER2:
  for (const sue of inp) {
    for (const [k, v] of sue.compounds) {
      switch (k) {
        case 'cats':
        case 'trees':
          if (v <= TARGET[k]) {
            continue OUTER2;
          }
          break;
        case 'pomeranians':
        case 'goldfish':
          if (v >= TARGET[k]) {
            continue OUTER2;
          }
          break;
        default:
          if (TARGET[k] !== v) {
            continue OUTER2;
          }
          break;
      }
    }
    return sue.sue;
  }
  return NaN;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
