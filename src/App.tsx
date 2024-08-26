import { Box, Grid, TextField } from "@mui/material";
import { useNpcData, loadFromLocalStorage } from "./utils/api";
import InputGroup from "./components/InputGroup";
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
          <StatblockForm
            handleFieldChange={handleFieldChange}
            npcData={npcData}
          />
        </Grid>
        {/* Right column */}
        <Grid item md={6}>
          <StatblockDisplay data={npcData} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
