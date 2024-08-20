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
  const [npcName, setNpcName] = useState<string>("Name");

  const { npcData, updateField, updateData } = useNpcData();
  let npc = npcData;

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
            height: "100vh",
          }}
        >
          <h1>Inputs</h1>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item md={12}>
                <TextField
                  // onChange={(e) => setNpcName(e.target.value)}
                  // onChange={(e) => updateField("name", e.target.value)}
                  onChange={(e) => (npc.name = e.target.value)}
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
              <Grid item md={9}>
                <Button variant="outlined">Reset</Button>
              </Grid>
              <Grid item md={3}>
                <Button variant="contained">Submit</Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Right column */}
        <Grid item md={6}>
          <h1>Statblock</h1>
          <h2>{npcData.name}</h2>
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
