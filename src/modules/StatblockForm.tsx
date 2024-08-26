import { Box, Grid, TextField, Typography } from "@mui/material";
import { NpcData } from "../types";
import InputGroup from "../components/InputGroup";

interface StatblockFormProps {
  handleFieldChange: (field: keyof NpcData, value: string) => void;
  npcData: NpcData;
}

const StatblockForm = ({ handleFieldChange, npcData }: StatblockFormProps) => {
  return (
    <Grid container>
      <Typography variant="h3" gutterBottom>
        Inputs
      </Typography>

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
  );
};

export default StatblockForm;
