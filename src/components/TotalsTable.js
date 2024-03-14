import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(title, value) {
  return { title, value };
}

const rows = [
  createData("SubTotal", 22.34),
  createData("Tax", 4.33),
  createData("Total", 26.0),
];

export default function totalsTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: "100%" }} size="small" aria-label="a dense table">
        <TableHead></TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
