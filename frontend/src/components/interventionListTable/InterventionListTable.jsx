import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledEngineProvider } from "@mui/material/styles";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./InterventionListTable.module.css";

const rows = [
  {
    social_secu_number: "2820259000001",
    identifier_rpps: "348398084834",
    type_intervention: "Chirurgie",
    procedure_date: "2023-07-14",
  },
  {
    social_secu_number: "2820259000002",
    identifier_rpps: "348398084834",
    type_intervention: "Chirurgie",
    procedure_date: "2023-07-14",
  },
  {
    social_secu_number: "2820259000003",
    identifier_rpps: "348398084834",
    type_intervention: "Chirurgie",
    procedure_date: "2023-07-14",
  },
];

function InterventionListTable() {
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
                N° sécurite sociale
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
              >
                Type d'intervention
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "1.2rem" }}
                align="right"
              >
                Date
              </TableCell>

              <TableCell className={styles.textEntete} align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                className={styles.ligne}
                key={row.social_secu_number}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  className={styles.textRows}
                  component="th"
                  scope="row"
                >
                  {row.social_secu_number}
                </TableCell>
                <TableCell className={styles.textRows} align="right">
                  {row.identifier_rpps}
                </TableCell>
                <TableCell className={styles.textRows} align="right">
                  {row.type_intervention}
                </TableCell>
                <TableCell className={styles.textRows} align="right">
                  {row.procedure_date}
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

export default InterventionListTable;
