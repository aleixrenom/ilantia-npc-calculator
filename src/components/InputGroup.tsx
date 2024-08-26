import React from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { NpcData } from "../types";

interface InputsProp {
  field: keyof NpcData;
  label: string;
  type: "string" | "number";
}

interface InputGroupProps {
  handleFieldChange: (field: keyof NpcData, value: string) => void;
  npcData: NpcData;
  title: string;
  inputs?: InputsProp[];
}

const InputGroup = ({
  handleFieldChange,
  npcData,
  title,
  inputs,
}: InputGroupProps) => {
  return (
    <Grid container>
      <Grid item md={12}>
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid item md={12}>
        <Grid container spacing={2}>
          {inputs &&
            inputs.map((item, index) => {
              return (
                <Grid key={index} item md={3}>
                  <TextField
                    onChange={(e) =>
                      handleFieldChange(item.field, e.target.value)
                    }
                    value={npcData[item.field]}
                    id={item.field}
                    label={item.label}
                    variant="standard"
                    type={item.type}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InputGroup;
