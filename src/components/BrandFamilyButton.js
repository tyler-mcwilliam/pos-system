import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export default function BrandFamilyButton({ brand, change }) {
  return (
    <Grid>
      <Button variant="contained" onClick={() => change(brand)}>
        {brand}
      </Button>
    </Grid>
  );
}
