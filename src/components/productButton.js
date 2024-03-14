import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

function createData(name, quantity, totalPrice) {
  return { name, quantity, totalPrice };
}

export default function ProductButton({ product, change }) {
  return (
    <Grid>
      <Button variant="contained" onClick={() => change("productButton")}>
        {product["SKUName"]}
      </Button>
    </Grid>
  );
}