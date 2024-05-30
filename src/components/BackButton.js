import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton({ change }) {
  return (
    <Grid>
      <Button variant="contained" onClick={() => change()}>
        <ArrowBackIcon />
      </Button>
    </Grid>
  );
}
