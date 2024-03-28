import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export default function ProductButton({ product, change }) {
  return (
    <Grid>
      <Button
        variant="contained"
        onClick={() => change(product["Packings"][0])}
      >
        {product && product["SKUName"]}
      </Button>
    </Grid>
  );
}
