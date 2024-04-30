import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";

export default function ProductButton({ product, openModal }) {
  function handleClick() {
    openModal(product);
  }

  return (
    <Grid>
      <Button variant="contained" onClick={() => handleClick()}>
        {product && product["SKUName"]}
      </Button>
    </Grid>
  );
}
