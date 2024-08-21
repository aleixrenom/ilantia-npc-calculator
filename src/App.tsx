import React, { useState } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";
import gameInfo from "./gameInfo.json";
import {
  calcArcheryStats,
  calcDefense,
  calcMeleeDamage,
  calcModifier,
  calcRank,
} from "./utils/calculate";
import { useNpcData } from "./utils/api";

function App() {
  const { npcData, updateField } = useNpcData();
  const {
    name,
    initBody,
    initDex,
    initMind,
    initSoul,
    alchemyPl,
    archeryPl,
    magicPl,
    meleePl,
    armor,
    extraArcheryDmg,
    extraArcheryRange,
    extraHp,
    extraIp,
    extraMeleeDmg,
    speeds,
  } = npcData;

  const bodyStat = initBody + calcRank(meleePl);
  const dexStat = initDex + calcRank(archeryPl);
  const mindStat = initMind + calcRank(alchemyPl);
  const soulStat = initSoul + calcRank(magicPl);

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Left column */}
        <Grid
          item
          md={6}
          sx={{
            overflow: "auto",
            height: "90vh",
          }}
        >
          <h1>Inputs</h1>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item md={12}>
                <TextField
                  onChange={(e) => updateField("name", e.target.value)}
                  value={name}
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
                  onChange={(e) => updateField("initBody", e.target.value)}
                  value={initBody}
                  id="initial-body"
                  label="Body"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => updateField("initDex", e.target.value)}
                  value={initDex}
                  id="initial-dexterity"
                  label="Dexterity"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => updateField("initMind", e.target.value)}
                  value={initMind}
                  id="initial-mind"
                  label="Mind"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => updateField("initSoul", e.target.value)}
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
                  onChange={(e) => updateField("meleePl", e.target.value)}
                  value={meleePl}
                  id="melee-pl"
                  label="Melee PL"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => updateField("archeryPl", e.target.value)}
                  value={archeryPl}
                  id="archery-pl"
                  label="Archery PL"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => updateField("alchemyPl", e.target.value)}
                  value={alchemyPl}
                  id="alchemy-pl"
                  label="Alchemy PL"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => updateField("magicPl", e.target.value)}
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
                  onChange={(e) => updateField("armor", e.target.value)}
                  value={armor}
                  id="armor"
                  label="Armor"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => updateField("speeds", e.target.value)}
                  value={speeds}
                  id="speeds"
                  label="Speeds"
                  variant="standard"
                  type="text"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => updateField("extraHp", e.target.value)}
                  value={extraHp}
                  id="extraHp"
                  label="Extra HP"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => updateField("extraMeleeDmg", e.target.value)}
                  value={extraMeleeDmg}
                  id="extraMeleeDmg"
                  label="Extra Melee dmg"
                  variant="standard"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) =>
                    updateField("extraArcheryDmg", e.target.value)
                  }
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
                    updateField("extraArcheryRange", e.target.value)
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
                  onChange={(e) => updateField("extraIp", e.target.value)}
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
          <h2>{name}</h2>
          <h3>Stats</h3>
          <p>
            Body: {bodyStat} ({calcModifier(bodyStat, true)}){" - "}
            Dexterity: {dexStat} ({calcModifier(dexStat, true)}){" - "}
            Mind: {mindStat} ({calcModifier(mindStat, true)}){" - "}
            Soul: {soulStat} ({calcModifier(soulStat, true)})
          </p>
          <p>
            HP:{" "}
            {2 +
              (meleePl + archeryPl + alchemyPl + magicPl) * 2 +
              meleePl +
              extraHp}{" "}
            - Defense:{" "}
            {calcDefense(
              calcModifier(bodyStat) as number,
              calcModifier(dexStat) as number,
              armor
            )}{" "}
            - Speed: {speeds}
          </p>
          <h3>Skills (PL {meleePl + archeryPl + alchemyPl + magicPl})</h3>
          <p>
            Melee rank {calcRank(meleePl)}
            {" - "}
            {calcMeleeDamage(calcRank(meleePl), true, extraMeleeDmg)}
          </p>
          <p>
            Archery rank {calcRank(archeryPl)}
            {" - "}
            {
              calcArcheryStats(
                calcRank(archeryPl),
                true,
                extraArcheryDmg,
                extraArcheryRange
              ) as string
            }
          </p>
          <p>
            Alchemy rank {calcRank(alchemyPl)}
            {" - "}
            {"Mak IP: " + alchemyPl * 2}
          </p>
          <p>
            Natural magic rank {calcRank(magicPl)}
            {" - "}
            {"Mak IP: " + magicPl * 2}
          </p>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
