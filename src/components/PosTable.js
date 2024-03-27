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
            <TableCell>Name</TableCell>
            <TableCell align="right">Packing</TableCell>
            <TableCell align="right">QTY</TableCell>
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
                <TableCell onClick={() => props.handleProductState(product)}>
                  <DeleteIcon />
                </TableCell>
                <TableCell component="th" scope="row">
                  {product["SKUName"]}
                </TableCell>
                <TableCell align="right">{product.packing}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
