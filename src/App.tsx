import React, { useState } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import gameInfo from "./gameInfo.json";

const checkRank = (pl: number): number => {
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

const calculateDefense = (
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
const modifier = (stat: number, text: boolean = false): string | number => {
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
const meleeDamage = (
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

const archeryStats = (
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

function App() {
  const [npcName, setNpcName] = useState<string>("Name");

  const [initBody, setInitBody] = useState<number>(10);
  const [initDex, setInitDex] = useState<number>(10);
  const [initMind, setInitMind] = useState<number>(10);
  const [initSoul, setInitSoul] = useState<number>(10);

  const [meleePl, setMeleePl] = useState<number>(0);
  const [archeryPl, setArcheryPl] = useState<number>(0);
  const [alchemyPl, setAlchemyPl] = useState<number>(0);
  const [magicPl, setMagicPl] = useState<number>(0);

  const [armor, setArmor] = useState<number>(0);
  const [extraHp, setExtraHp] = useState<number>(0);
  const [extraMeleeDmg, setExtraMeleeDmg] = useState<number>(0);
  const [extraArcheryDmg, setExtraArcheryDmg] = useState<number>(0);
  const [extraArcheryRange, setExtraArcheryRange] = useState<number>(0);
  const [extraIp, setExtraIp] = useState<number>(0);
  const [speeds, setSpeeds] = useState<string>("30ft");

  const bodyStat = initBody + checkRank(meleePl);
  const dexStat = initDex + checkRank(archeryPl);
  const mindStat = initMind + checkRank(alchemyPl);
  const soulStat = initSoul + checkRank(magicPl);

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Left column */}
        <Grid
          item
          md={6}
          sx={{
            overflow: "auto",
            height: "100vh",
          }}
        >
          <h1>Inputs</h1>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item md={12}>
                <TextField
                  onChange={(e) => setNpcName(e.target.value)}
                  id="npc-name"
                  label="NPC Name"
                  variant="standard"
                  fullWidth
                />
              </Grid>
              <Grid item md={12}>
                <h3>Initial stats</h3>
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setInitBody(parseInt(e.target.value))}
                  value={initBody}
                  id="initial-body"
                  label="Body"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setInitDex(parseInt(e.target.value))}
                  value={initDex}
                  id="initial-dexterity"
                  label="Dexterity"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setInitMind(parseInt(e.target.value))}
                  value={initMind}
                  id="initial-mind"
                  label="Mind"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setInitSoul(parseInt(e.target.value))}
                  value={initSoul}
                  id="initial-soul"
                  label="Soul"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={12}>
                <h3>Power levels</h3>
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setMeleePl(parseInt(e.target.value))}
                  value={meleePl}
                  id="melee-pl"
                  label="Melee PL"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setArcheryPl(parseInt(e.target.value))}
                  value={archeryPl}
                  id="archery-pl"
                  label="Archery PL"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setAlchemyPl(parseInt(e.target.value))}
                  value={alchemyPl}
                  id="alchemy-pl"
                  label="Alchemy PL"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setMagicPl(parseInt(e.target.value))}
                  value={magicPl}
                  id="magic-pl"
                  label="Magic PL"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={12}>
                <h3>Other</h3>
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setArmor(parseInt(e.target.value))}
                  value={armor}
                  id="armor"
                  label="Armor"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setSpeeds(e.target.value)}
                  value={speeds}
                  id="speeds"
                  label="Speeds"
                  variant="standard"
                  type="text"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setExtraHp(parseInt(e.target.value))}
                  value={extraHp}
                  id="extraHp"
                  label="Extra HP"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setExtraMeleeDmg(parseInt(e.target.value))}
                  value={extraMeleeDmg}
                  id="extraMeleeDmg"
                  label="Extra Melee dmg"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setExtraArcheryDmg(parseInt(e.target.value))}
                  value={extraArcheryDmg}
                  id="extraArcheryDmg"
                  label="Extra Archery dmg"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) =>
                    setExtraArcheryRange(parseInt(e.target.value))
                  }
                  value={extraArcheryRange}
                  id="extraArcheryRange"
                  label="Extra Archery range"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setExtraIp(parseInt(e.target.value))}
                  value={extraIp}
                  id="extraIp"
                  label="Extra IP"
                  variant="standard"
                  type="number"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Right column */}
        <Grid item md={6}>
          <h1>Statblock</h1>
          <h2>{npcName}</h2>
          <h3>Stats</h3>
          <p>
            Body: {bodyStat} ({modifier(bodyStat, true)}){" - "}
            Dexterity: {dexStat} ({modifier(dexStat, true)}){" - "}
            Mind: {mindStat} ({modifier(mindStat, true)}){" - "}
            Soul: {soulStat} ({modifier(soulStat, true)})
          </p>
          <p>
            HP:{" "}
            {2 +
              (meleePl + archeryPl + alchemyPl + magicPl) * 2 +
              meleePl +
              extraHp}{" "}
            - Defense:{" "}
            {calculateDefense(
              modifier(bodyStat) as number,
              modifier(dexStat) as number,
              armor
            )}{" "}
            - Speed: {speeds}
          </p>
          <h3>Skills (PL {meleePl + archeryPl + alchemyPl + magicPl})</h3>
          <p>
            Melee rank {checkRank(meleePl)}
            {" - "}
            {meleeDamage(checkRank(meleePl), true, extraMeleeDmg)}
          </p>
          <p>
            Archery rank {checkRank(archeryPl)}
            {" - "}
            {
              archeryStats(
                checkRank(archeryPl),
                true,
                extraArcheryDmg,
                extraArcheryRange
              ) as string
            }
          </p>
          <p>
            Alchemy rank {checkRank(alchemyPl)}
            {" - "}
            {"Mak IP: " + alchemyPl * 2}
          </p>
          <p>
            Natural magic rank {checkRank(magicPl)}
            {" - "}
            {"Mak IP: " + magicPl * 2}
          </p>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
