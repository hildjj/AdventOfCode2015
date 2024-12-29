import { type MainArgs, parseFile } from './lib/utils.ts';

interface Stats {
  HP: number;
  Damage: number;
  Armor: number;
  cost?: number;
  costs?: number[];
}
type Parsed = Stats;

type Item = [cost: number, Damage: number, Armor: number];

// Weapons:    Cost  Damage  Armor
const weapons: Item[] = [
  [8, 4, 0], // Dagger
  [10, 5, 0], // Shortsword
  [25, 6, 0], // Warhammer
  [40, 7, 0], // Longsword
  [74, 8, 0], // Greataxe
];

const armor: Item[] = [
  [0, 0, 0],
  [13, 0, 1], // Leather
  [31, 0, 2], // Chainmail
  [53, 0, 3], // Splintmail
  [75, 0, 4], // Bandedmail
  [102, 0, 5], // Platemail
];

const ring1: Item[] = [
  [0, 0, 0],
  [25, 1, 0], // Damage+1
  [50, 2, 0], // Damage+2
  [100, 3, 0], // Damage+3
];

const ring2: Item[] = [
  [0, 0, 0],
  [20, 0, 1], // Defense+1
  [40, 0, 2], // Defense+2
  [80, 0, 3], // Defense+3
];

// True if I win
function fight(me: Stats, boss: Stats): boolean {
  let meHP = me.HP;
  let bossHP = boss.HP;
  const meDmg = Math.max(me.Damage - boss.Armor, 1);
  const bossDmg = Math.max(boss.Damage - me.Armor, 1);
  while (true) {
    bossHP -= meDmg;
    if (bossHP <= 0) {
      return true;
    }
    meHP -= bossDmg;
    if (meHP <= 0) {
      return false;
    }
  }
}

function part12(inp: Parsed): [number, number] {
  let min = Infinity;
  let max = -Infinity;

  for (const [wcost, wdmg, wdef] of weapons) {
    for (const [acost, admg, adef] of armor) {
      for (const [r1cost, r1dmg, r1def] of ring1) {
        for (const [r2cost, r2dmg, r2def] of ring2) {
          const costs = [wcost, acost, r1cost, r2cost];
          const me: Stats = {
            HP: 100,
            Damage: wdmg + admg + r1dmg + r2dmg,
            Armor: wdef + adef + r1def + r2def,
            cost: costs.reduce((t, v) => t + v),
            costs,
          };
          if (fight(me, inp)) {
            min = Math.min(min, me.cost!);
          } else {
            max = Math.max(max, me.cost!);
          }
        }
      }
    }
  }
  return [min, max];
}

export default async function main(args: MainArgs): Promise<[number, number]> {
  const inp = await parseFile<Parsed>(args);
  return part12(inp);
}
