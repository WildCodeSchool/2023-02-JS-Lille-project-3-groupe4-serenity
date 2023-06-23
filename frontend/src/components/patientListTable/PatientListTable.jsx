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
import styles from "./PatientListTable.module.css";

const rows = [
  {
    last_name: "Durand",
    first_name: "Nathalie",
    age: 32,
    social_secu_number: 2820259000001,
  },
  {
    last_name: "Durand",
    first_name: "Michel",
    age: 32,
    social_secu_number: 1820259000002,
  },
  {
    last_name: "Durand",
    first_name: "Michel",
    age: 32,
    social_secu_number: 1820259000003,
  },
  {
    last_name: "Durand",
    first_name: "Michel",
    age: 32,
    social_secu_number: 1820259000004,
  },
  {
    last_name: "Durand",
    first_name: "Michel",
    age: 32,
    social_secu_number: 1820259000005,
  },
];

function PatientListTable() {
  return (
    <StyledEngineProvider>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className={styles.entete}>
              <TableCell className={styles.textEntete} hover="true">
                Nom
              </TableCell>
              <TableCell className={styles.textEntete} align="right">
                Prénom
              </TableCell>
              <TableCell className={styles.textEntete} align="right">
                Age
              </TableCell>
              <TableCell className={styles.textEntete} align="right">
                N° de sécurité sociale
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
                  {row.last_name}
                </TableCell>
                <TableCell className={styles.textRows} align="right">
                  {row.first_name}
                </TableCell>
                <TableCell className={styles.textRows} align="right">
                  {row.age}
                </TableCell>
                <TableCell className={styles.textRows} align="right">
                  {row.social_secu_number}
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

export default PatientListTable;
