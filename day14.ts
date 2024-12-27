import { divmod, type MainArgs, parseFile } from './lib/utils.ts';

interface Deer {
  name: string;
  speed: number;
  duration: number;
  rest: number;
}
type Parsed = Deer[];
const DUR = 2503;

function part1(inp: Parsed): number {
  let max = -Infinity;
  for (const { speed, duration, rest } of inp) {
    const [div, mod] = divmod(DUR, duration + rest);
    const dist = (div * speed * duration) + (Math.min(mod, duration) * speed);
    max = Math.max(max, dist);
  }
  return max;
}

interface State {
  name: string;
  speed: number;
  duration: number;
  rest: number;
  resting: boolean;
  remaining: number;
  points: number;
  dist: number;
}

function part2(inp: Parsed): number {
  const points: { [name: string]: State } = Object.create(null);
  for (const { name, speed, duration, rest } of inp) {
    points[name] = {
      name,
      speed,
      duration,
      rest,
      resting: false,
      remaining: duration,
      points: 0,
      dist: 0,
    };
  }
  for (let i = 0; i < DUR; i++) {
    let max = -Infinity;
    let maxDeer = '';
    for (const p of Object.values(points)) {
      if (p.remaining === 0) {
        p.resting = !p.resting;
        p.remaining = p.resting ? p.rest : p.duration;
      }
      if (!p.resting) {
        p.dist += p.speed;
      }
      if (p.dist > max) {
        max = p.dist;
        maxDeer = p.name;
      }
      p.remaining--;
    }
    points[maxDeer].points++;
  }
  let win = -Infinity;
  for (const p of Object.values(points)) {
    win = Math.max(win, p.points);
  }
  return win;
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return [part1(inp), part2(inp)];
}
