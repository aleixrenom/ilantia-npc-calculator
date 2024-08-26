import { Box, Grid, Paper } from "@mui/material";
import { useNpcData, loadFromLocalStorage } from "./utils/api";
import { useState } from "react";
import StatblockDisplay from "./modules/StatblockDisplay";
import { NpcData } from "./types";
import defaultValues from "./utils/npcDefaultValues.json";
import StatblockForm from "./modules/StatblockForm";

function App() {
  const initialData = loadFromLocalStorage<NpcData>("npcData") || defaultValues;
  const [npcData, setNpcData] = useState<NpcData>(initialData);
  const { updateField } = useNpcData();

  const handleFieldChange = (field: keyof NpcData, value: string) => {
    setNpcData(updateField(field, value));
  };

  const columnStyle = {
    overflow: "auto",
    height: "100vh",
    // padding: "20px",
  };

  const paperStyle = {
    margin: "20px",
    padding: "20px",
  };

  return (
    <Box>
      <Grid container>
        {/* Left column */}
        <Grid item md={6} sx={columnStyle}>
          <Paper elevation={3} sx={paperStyle}>
            <StatblockForm
              handleFieldChange={handleFieldChange}
              npcData={npcData}
            />
          </Paper>
        </Grid>
        {/* Right column */}
        <Grid item md={6} sx={columnStyle}>
          <Paper elevation={3} sx={paperStyle}>
            <StatblockDisplay data={npcData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
