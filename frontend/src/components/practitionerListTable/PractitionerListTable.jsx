import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledEngineProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./practitionerListTable.module.css";

// const rows = [
//   {
//     last_name: "Durand",
//     first_name: "Nathalie",
//     speciality: 32,
//     identifier_rpps: 2820259,
//   },
//   {
//     last_name: "Durand",
//     first_name: "Nathalie",
//     speciality: 32,
//     identifier_rpps: 2820251,
//   },
//   {
//     last_name: "Durand",
//     first_name: "Nathalie",
//     speciality: 32,
//     identifier_rpps: 28202592,
//   },
//   {
//     last_name: "Durand",
//     first_name: "Nathalie",
//     speciality: 32,
//     identifier_rpps: 28202593,
//   },
// ];

function PractitionerListTable() {
  const [practitioners, setPractitioners] = useState([]);

  useEffect(() => {
    const fectchAllPractitionner = async () => {
      try {
        const response = await axios.get("http://localhost:5050/practitioners");
        setPractitioners(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllPractitionner();
  }, []);
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
            {practitioners.length > 0 &&
              practitioners.map((row) => (
                <TableRow
                  className={styles.ligne}
                  key={row.identifiantrpps}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className={styles.textRows}
                    component="th"
                    scope="row"
                  >
                    {row.nom}
                  </TableCell>
                  <TableCell className={styles.textRows} align="right">
                    {row.prenom}
                  </TableCell>
                  <TableCell className={styles.textRows} align="right">
                    {row.speciality}
                  </TableCell>
                  <TableCell className={styles.textRows} align="right">
                    {row.identifiantrpps}
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
