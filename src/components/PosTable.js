import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PosTable(props) {
  return (
    <TableContainer sx={{ height: "100%" }} component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell><b>Name</b></TableCell>
            <TableCell align="right">
              <b>Packing</b>
            </TableCell>
            <TableCell align="right">
              <b>QTY</b>
            </TableCell>
            <TableCell align="right">
              <b>Unit Price</b>
            </TableCell>
            <TableCell align="right">
              <b>Total</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products &&
            props.products.map((product) => (
              <TableRow
                key={product.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell onClick={() => props.deleteProductState(product)}>
                  <DeleteIcon sx={{ cursor: "pointer" }} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {product["name"]}
                </TableCell>
                <TableCell align="right">{product["uom"]}</TableCell>
                <TableCell align="right">{product["quantity"]}</TableCell>
                <TableCell align="right">
                  {product["unitPrice"].toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  {product["totalPrice"].toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
