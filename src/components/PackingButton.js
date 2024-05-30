import * as React from "react";
import Button from "@mui/material/Button";

export default function PackingButton({ packing, change }) {
  return (
    <Grid>
      <Button variant="contained" onClick={() => change(packing)}>
        {packing && packing["UOM"]}
      </Button>
    </Grid>
  );
}
