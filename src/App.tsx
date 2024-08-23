import { Box, Grid, TextField } from "@mui/material";
import { useNpcData, loadFromLocalStorage } from "./utils/api";
import InputGroup from "./components/InputGroup";
import { useState } from "react";
import StatblockDisplay from "./modules/StatblockDisplay";
import { NpcData } from "./types";
import defaultValues from "./utils/npcDefaultValues.json";

function App() {
  const initialData = loadFromLocalStorage<NpcData>("npcData") || defaultValues;
  const [npcData, setNpcData] = useState<NpcData>(initialData);
  const { updateField } = useNpcData();

  const handleFieldChange = (field: keyof NpcData, value: string) => {
    setNpcData(updateField(field, value));
  };

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
                  onChange={(e) => handleFieldChange("name", e.target.value)}
                  value={npcData.name}
                  id="npc-name"
                  label="NPC Name"
                  variant="standard"
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid item md={12}>
                <InputGroup
                  handleFieldChange={handleFieldChange}
                  npcData={npcData}
                  title="Initial stats"
                  inputs={[
                    { field: "initBody", label: "Body", type: "number" },
                    { field: "initDex", label: "Dexterity", type: "number" },
                    { field: "initMind", label: "Mind", type: "number" },
                    { field: "initSoul", label: "Soul", type: "number" },
                  ]}
                />
              </Grid>
              <Grid item md={12}>
                <InputGroup
                  handleFieldChange={handleFieldChange}
                  npcData={npcData}
                  title="Power levels"
                  inputs={[
                    { field: "meleePl", label: "Melee PL", type: "number" },
                    { field: "archeryPl", label: "Archery PL", type: "number" },
                    { field: "alchemyPl", label: "Alchemy PL", type: "number" },
                    { field: "magicPl", label: "Magic PL", type: "number" },
                  ]}
                />
              </Grid>
              <Grid item md={12}>
                <InputGroup
                  handleFieldChange={handleFieldChange}
                  npcData={npcData}
                  title="Other"
                  inputs={[
                    { field: "armor", label: "Armor", type: "number" },
                    { field: "speeds", label: "Speeds", type: "string" },
                    { field: "extraHp", label: "Extra HP", type: "number" },
                    {
                      field: "extraMeleeDmg",
                      label: "Extra Melee dmg",
                      type: "number",
                    },
                    {
                      field: "extraArcheryDmg",
                      label: "Extra Archery dmg",
                      type: "number",
                    },
                    {
                      field: "extraArcheryRange",
                      label: "Extra Archery range",
                      type: "number",
                    },
                    { field: "extraIp", label: "Extra IP", type: "number" },
                  ]}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Right column */}
        <Grid item md={6}>
          <StatblockDisplay data={npcData} />
          {/* <h1>Statblock</h1>
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
          </p> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
