import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import formatDate from "../../../services/dateUtils";
import styles from "./InterventionListTable.module.css";

function InterventionListTable() {
  const [interventions, setInterventions] = useState([]);
  const { identifierRpps } = useParams();

  useEffect(() => {
    const fetchAllInterventionByIdentifierRpps = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/interventions/patients/${identifierRpps}`
        );
        setInterventions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllInterventionByIdentifierRpps();
  }, []);

  return (
    <table className={styles.tablePractitionerPatientContainer}>
      <thead className={styles.theadContainer}>
        <tr className={styles.trContainer}>
          <th className={styles.theadRowContainer}>Nom de l'intervention</th>
          <th className={styles.theadRowContainer}>Type d'intervention</th>
          <th className={styles.theadRowContainer}>Nom du patient</th>
          <th className={styles.theadRowContainer}>Prénom du patient</th>
          <th className={styles.theadRowContainer}>Date d'intervention</th>
          <th className={styles.theadRowContainer}>Détails</th>
        </tr>
      </thead>
      <tbody>
        {interventions.map((intervention) => (
          <tr
            className={styles.bodyRowsContainer}
            key={intervention.identifierRpps}
          >
            <td className={styles.rowsContainer}>
              {intervention.nom_intervention}
            </td>
            <td className={styles.rowsContainer}>
              {intervention.type_intervention}
            </td>
            <td className={styles.rowsContainer}>
              {intervention.patient_last_name}
            </td>
            <td className={styles.rowsContainer}>
              {intervention.patient_first_name}
            </td>
            <td className={styles.rowsContainer}>
              {formatDate(intervention.intervention_date)}
            </td>
            <td className={styles.rowsContainer}>
              <Link
                to={`/practitioner/interventions/infos/${intervention.social_secu_number}`}
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
