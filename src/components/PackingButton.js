import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import PackingModal from "./PackingModal";

export default function PackingButton({ packing, change }) {
  return (
    <Grid>
      <Button variant="contained" onClick={() => change(packing)}>
        {packing && packing["UOM"]}
      </Button>
    </Grid>
  );
}
