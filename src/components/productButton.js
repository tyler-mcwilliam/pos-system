import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function createData(name, quantity, totalPrice) {
  return { name, quantity, totalPrice };
}

export default function ProductButton({ product, change }) {
  return (
    <Grid>
      <Button variant="contained" onClick={() => change(product)}>
        {product === "Back" && <ArrowBackIcon />}
        {product["SKUName"]}
      </Button>
    </Grid>
  );
}
