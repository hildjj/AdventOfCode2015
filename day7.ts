import { assert } from '@std/assert';
import { type MainArgs, parseFile } from './lib/utils.ts';

type Command = [
  [operand1: string | number, op: string, operand2?: string | number],
  dest: string,
];
type Parsed = Command[];

function part1(inp: Parsed, wires = new Map<string, number>()): number {
  while (inp.length) {
    const next = [];
    for (const cmd of inp) {
      const [[op1, op, op2], dest] = cmd;
      const op1v = (typeof op1 === 'string') ? wires.get(op1) : op1;
      if (op1v === undefined) {
        next.push(cmd);
        continue;
      }
      const op2v = (typeof op2 === 'string') ? wires.get(op2) : op2;
      switch (op) {
        case 'EQ':
          if (!wires.has(dest)) {
            wires.set(dest, op1v);
          }
          break;
        case 'NOT':
          wires.set(dest, ~op1v & 0xffff);
          break;
        default:
          // Two-operand opcodes
          if (op2v === undefined) {
            next.push(cmd);
            continue;
          }
          switch (op) {
            case 'OR':
              wires.set(dest, op1v | op2v);
              break;
            case 'AND':
              wires.set(dest, op1v & op2v);
              break;
            case 'RSHIFT':
              wires.set(dest, op1v >> op2v);
              break;
            case 'LSHIFT': {
              const res = op1v << op2v;
              assert(res <= 0xffff, `Overflow: ${op1v} << ${op2v} = ${res}`);
              wires.set(dest, res);
              break;
            }
          }
      }
    }
    inp = next;
  }
  return wires.get('a')!;
}

function part2(inp: Parsed): number {
  const a = part1(inp);
  return part1(inp, new Map([['b', a]]));
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
