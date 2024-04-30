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
  console.log(props.products);
  return (
    <TableContainer sx={{ height: "100%" }} component={Paper}>
      <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Packing</TableCell>
            <TableCell align="right">QTY</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Total</TableCell>
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
                <TableCell align="right">{product["unitPrice"]}</TableCell>
                <TableCell align="right">{product["totalPrice"]}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
