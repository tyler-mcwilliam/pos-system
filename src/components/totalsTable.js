import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TotalsTable({ selectedProducts }) {
  const subtotal = selectedProducts
    .filter((product) => product["upc"] !== "offer")
    .reduce((sum, product) => sum + product["totalPrice"], 0);
  const offerTotal = selectedProducts
    .filter((product) => product["upc"] === "offer")
    .reduce((sum, product) => sum + product["totalPrice"], 0);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell><b>{"SubTotal"}</b></TableCell>
            <TableCell>{subtotal.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell><b>{"Discounts"}</b></TableCell>
            <TableCell>{offerTotal.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell><b>{"Total"}</b></TableCell>
            <TableCell>{(subtotal + offerTotal).toFixed(2)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
