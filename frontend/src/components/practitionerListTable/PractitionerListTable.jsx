import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./PractitionerListTable.module.css";

// const rows = [
//   {
//     nom: "Durand",
//     prenom: "Nathalie",
//     speciality: 32,
//     identifiantrpps: 2820259,
//   },
//   {
//     nom: "Durand",
//     prenom: "Nathalie",
//     speciality: 32,
//     identifiantrpps: 2820251,
//   },
//   {
//     nom: "Durand",
//     prenom: "Nathalie",
//     speciality: 32,
//     identifiantrpps: 28202592,
//   },
//   {
//     nom: "Durand",
//     prenom: "Nathalie",
//     speciality: 32,
//     identifiantrpps: 28202593,
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
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th className={styles.theadRow}>Nom</th>
          <th className={styles.theadRow}>Prénom</th>
          <th className={styles.theadRow}>Spécialité</th>
          <th className={styles.theadRow}>N°RPPS</th>
          <th className={styles.theadRow}>Détails</th>
        </tr>
      </thead>
      <tbody>
        {practitioners.map((practitioner) => (
          <tr className={styles.bodyRows} key={practitioner.identifiantrpps}>
            <td className={styles.rows}>{practitioner.nom}</td>
            <td className={styles.rows}>{practitioner.prenom}</td>
            <td className={styles.rows}>{practitioner.speciality}</td>
            <td className={styles.rows}>{practitioner.identifiantrpps}</td>
            <td className={styles.rows}>
              <Link to="https://reactrouter.com/en/main/components/link">
                <FaEye className={styles.eyeIcon} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PractitionerListTable;
