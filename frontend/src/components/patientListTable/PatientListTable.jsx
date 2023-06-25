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
import styles from "./PatientListTable.module.css";

// const rows = [
//   {
//     last_name: "Durand",
//     first_name: "Nathalie",
//     age: 32,
//     social_secu_number: 2820259000001,
//   },
//   {
//     last_name: "Durand",
//     first_name: "Michel",
//     age: 32,
//     social_secu_number: 1820259000002,
//   },
//   {
//     last_name: "Durand",
//     first_name: "Michel",
//     age: 32,
//     social_secu_number: 1820259000003,
//   },
//   {
//     last_name: "Durand",
//     first_name: "Michel",
//     age: 32,
//     social_secu_number: 1820259000004,
//   },
//   {
//     last_name: "Durand",
//     first_name: "Michel",
//     age: 32,
//     social_secu_number: 1820259000005,
//   },
// ];

function PatientListTable() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fectchAllPatient = async () => {
      try {
        const response = await axios.get("http://localhost:5050/patients");
        setPatients(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllPatient();
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
                Age
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "1.2rem" }}
                align="right"
              >
                N° de sécurité sociale
              </TableCell>
              <TableCell
                sx={{ color: "white", fontSize: "1.2rem" }}
                align="right"
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.length > 0 &&
              patients.map((row) => (
                <TableRow
                  className={styles.ligne}
                  key={row.social_number}
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
                    {row.age}
                  </TableCell>
                  <TableCell className={styles.textRows} align="right">
                    {row.social_number}
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
