import { type MainArgs, parseFile } from './lib/utils.ts';

interface Ingredient {
  name: string;
  props: number[]; // Calories always last
}

type Parsed = Ingredient[];

// Iterate over all combinations of numbers from 0-100 in counts, such that
// they always add to 100.
function* loop(
  counts: number[],
  max = 100,
  i = 0,
): Generator<number[], undefined, undefined> {
  if (i === counts.length - 1) {
    yield counts.with(i, 100 - counts.slice(0, -1).reduce((t, v) => t + v));
  } else {
    for (let j = 0; j <= max; j++) {
      yield* loop(counts.with(i, j), max - j, i + 1);
    }
  }
}

function part12(inp: Parsed): [number, number] {
  let max = -Infinity;
  let maxCalories = -Infinity;
  const counts = inp.map(() => 0);
  OUTER:
  for (const c of loop(counts)) {
    const props: number[] = [];
    for (let p = 0; p < 5; p++) {
      props[p] = inp.reduce((t, v, i) => t + c[i] * v.props[p], 0);
      if (props[p] < 0) {
        continue OUTER;
      }
    }
    const total = props.slice(0, -1).reduce((t, v) => t * v);
    max = Math.max(max, total);
    if (props[4] === 500) {
      maxCalories = Math.max(maxCalories, total);
    }
  }
  return [max, maxCalories];
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return part12(inp);
}
