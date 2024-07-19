import React, { useState } from "react";
import { Box, Grid, TextField, Button } from "@mui/material";

const checkRank = ({ pl }: { pl: number }): number => {
  return 0;
};

function App() {
  const [npcName, setNpcName] = useState<string>("Name");
  const [initBody, setInitBody] = useState<number>(0);
  const [initDex, setInitDex] = useState<number>(0);
  const [initMind, setInitMind] = useState<number>(0);
  const [initSoul, setInitSoul] = useState<number>(0);
  const [meleePl, setMeleePl] = useState<number>(0);
  const [archeryPl, setArcheryPl] = useState<number>(0);
  const [alchemyPl, setAlchemyPl] = useState<number>(0);
  const [magicPl, setMagicPl] = useState<number>(0);

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Left column */}
        <Grid item md={6}>
          <h1>Inputs</h1>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item md={12}>
                <TextField
                  onChange={(e) => setNpcName(e.target.value)}
                  id="npc-name"
                  label="NPC Name"
                  variant="outlined"
                  value={npcName}
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
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setInitDex(parseInt(e.target.value))}
                  value={initDex}
                  id="initial-dexterity"
                  label="Dexterity"
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setInitMind(parseInt(e.target.value))}
                  value={initMind}
                  id="initial-mind"
                  label="Mind"
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setInitSoul(parseInt(e.target.value))}
                  value={initSoul}
                  id="initial-soul"
                  label="Soul"
                  variant="outlined"
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
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setArcheryPl(parseInt(e.target.value))}
                  value={archeryPl}
                  id="archery-pl"
                  label="Archery PL"
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setAlchemyPl(parseInt(e.target.value))}
                  value={alchemyPl}
                  id="alchemy-pl"
                  label="Alchemy PL"
                  variant="outlined"
                  type="number"
                />
              </Grid>
              <Grid item md={3}>
                <TextField
                  onChange={(e) => setMagicPl(parseInt(e.target.value))}
                  value={magicPl}
                  id="magic-pl"
                  label="Magic PL"
                  variant="outlined"
                  type="number"
                />
              </Grid>
              {/* <Grid item md={6}>
                <TextField
                  id="manouvre"
                  label="Manouvre"
                  variant="outlined"
                  multiline
                  fullWidth
                />
              </Grid> */}
              <Grid item md={3}>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
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
            Body: {initBody} - Dexterity: {initDex}
          </p>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
