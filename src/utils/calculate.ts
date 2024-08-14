export const calcRank = (pl: number): number => {
  if (pl <= 0) {
    return 0;
  } else if (pl === 1) {
    return 1;
  } else if (pl >= 2 && pl <= 3) {
    return 2;
  } else if (pl >= 4 && pl <= 5) {
    return 3;
  } else if (pl >= 6 && pl <= 7) {
    return 4;
  } else if (pl >= 8 && pl <= 10) {
    return 5;
  } else if (pl >= 11 && pl <= 13) {
    return 6;
  } else if (pl >= 14 && pl <= 16) {
    return 7;
  } else if (pl >= 17 && pl <= 19) {
    return 8;
  } else if (pl >= 20 && pl <= 23) {
    return 9;
  } else {
    return 10;
  }
};

export const calcDefense = (
  bodyMod: number,
  dexterityMod: number,
  armor: number = 0
): number => {
  const def = dexterityMod + Math.floor(bodyMod / 2) + armor;
  if (def < 0) return 0;
  return def;
};

/**
 * Takes a stat and returns its modifier
 * @param {number} stat
 * @param {boolean} [text=false] if true, returns mod as a string starting with + or -
 * @returns
 */
export const calcModifier = (
  stat: number,
  text: boolean = false
): string | number => {
  const mod = stat - 10;
  if (!text) return mod;
  if (mod >= 0) return "+" + mod.toString();
  return mod.toString();
};

/**
 * Returns the base damage of the melee attack at the given rank
 * @param rank The Melee skill rank, between 0 and 10
 * @param text If true, returns the damage as a string with " dmg" at the end
 * @param extraDmg Optional amount to add to the damage
 * @returns
 */
export const calcMeleeDamage = (
  rank: number,
  text: boolean = false,
  extraDmg: number = 0
): string | number => {
  if (rank < 0 || rank > 10) return "'rank' needs to be between 0 and 10";
  const damages: { [rank: string]: number } = {
    "0": 0,
    "1": 2,
    "2": 3,
    "3": 4,
    "4": 6,
    "5": 10,
    "6": 14,
    "7": 18,
    "8": 24,
    "9": 30,
    "10": 40,
  };
  if (text) return (damages[rank.toString()] + extraDmg).toString() + " dmg";
  return damages[rank.toString()] + extraDmg;
};

export const calcArcheryStats = (
  rank: number,
  text: boolean = false,
  extraDmg: number = 0,
  extraRange: number = 0
): string | { dmg: number; range: number } => {
  if (rank < 0 || rank > 10) return "'rank' needs to be between 0 and 10";
  const stats: { [rank: string]: { dmg: number; range: number } } = {
    "0": { dmg: 0, range: 0 },
    "1": { dmg: 1, range: 30 },
    "2": { dmg: 2, range: 40 },
    "3": { dmg: 3, range: 50 },
    "4": { dmg: 4, range: 60 },
    "5": { dmg: 6, range: 70 },
    "6": { dmg: 10, range: 80 },
    "7": { dmg: 14, range: 90 },
    "8": { dmg: 18, range: 100 },
    "9": { dmg: 24, range: 110 },
    "10": { dmg: 30, range: 120 },
  };
  if (text)
    return (
      (stats[rank.toString()].dmg + extraDmg).toString() +
      " dmg / " +
      (stats[rank.toString()].range + extraRange).toString() +
      "ft"
    );
  return {
    dmg: stats[rank.toString()].dmg + extraDmg,
    range: stats[rank.toString()].range + extraRange,
  };
};
