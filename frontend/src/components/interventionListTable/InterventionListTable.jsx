import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./InterventionListTable.module.css";

/* const interventions = [
  {
    social_number: "2820259000001",
    identifier_rpps: "348398084834",
    Nomintervention: "Chirurgie",
    Dateintervention: "2023-07-14",
  },
  {
    social_number: "2820259000002",
    identifier_rpps: "348398084834",
    Nomintervention: "Chirurgie",
    Dateintervention: "2023-07-14",
  },
  {
    social_number: "2820259000003",
    identifier_rpps: "348398084834",
    Nomintervention: "Chirurgie",
    Dateintervention: "2023-07-14",
  },
]; */

function InterventionListTable() {
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    const fectchAllPatient = async () => {
      try {
        const response = await axios.get("http://localhost:5050/interventions");
        setInterventions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllPatient();
  }, []);

  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th className={styles.theadRow}>N° sécurite sociale</th>
          <th className={styles.theadRow}>N° RPPS</th>
          <th className={styles.theadRow}>Type d'intervention</th>
          <th className={styles.theadRow}>Date</th>
          <th className={styles.theadRow}>Détails</th>
        </tr>
      </thead>
      <tbody>
        {interventions.map((intervention) => (
          <tr className={styles.bodyRows} key={intervention.id_intervention}>
            <td className={styles.rows}>{intervention.social_number}</td>
            <td className={styles.rows}>{intervention.identifier_rpps}</td>
            <td className={styles.rows}>{intervention.Nomintervention}</td>
            <td className={styles.rows}>{intervention.Dateintervention}</td>
            <td className={styles.rows}>
              <Link
                to={`/secretariat/intervention/infos/${intervention.Dateintervention}`}
              >
                <FaEye className={styles.eyeIcon} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InterventionListTable;
