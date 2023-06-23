import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./PractitionerListTable.module.css";

const rows = [
  {
    last_name: "Durand",
    first_name: "Nathalie",
    speciality: 32,
    identifier_rpps: 2820259,
  },
  {
    last_name: "Durand",
    first_name: "Nathalie",
    speciality: 32,
    identifier_rpps: 2820251,
  },
  {
    last_name: "Durand",
    first_name: "Nathalie",
    speciality: 32,
    identifier_rpps: 28202592,
  },
  {
    last_name: "Durand",
    first_name: "Nathalie",
    speciality: 32,
    identifier_rpps: 28202593,
  },
];

function PractitionerListTable() {
  return (
    <StyledEngineProvider>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className={styles.entete}>
              <TableCell
                sx={{ color: "white", fontSize: "1.2rem" }}
                hover="true"
              >
                Nom
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "1.2rem" }}
                align="right"
              >
                Prénom
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "1.2rem" }}
                align="right"
              >
                Spécialité
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "1.2rem" }}
                align="right"
              >
                N° RPPS
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "1.2rem" }}
                align="right"
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                className={styles.ligne}
                key={row.identifier_rpps}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  className={styles.textRows}
                  component="th"
                  scope="row"
                >
                  {row.last_name}
                </TableCell>
                <TableCell className={styles.textRows} align="right">
                  {row.first_name}
                </TableCell>
                <TableCell className={styles.textRows} align="right">
                  {row.speciality}
                </TableCell>
                <TableCell className={styles.textRows} align="right">
                  {row.identifier_rpps}
                </TableCell>
                <TableCell className={styles.textRows} align="right">
                  <Link to="https://reactrouter.com/en/main/components/link">
                    <FaEye />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledEngineProvider>
  );
}

export default PractitionerListTable;
