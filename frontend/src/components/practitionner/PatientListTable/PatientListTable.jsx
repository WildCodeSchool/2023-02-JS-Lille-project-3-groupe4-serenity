import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import styles from "./PatientListTable.module.css";

function PatientListTable() {
  const [patients, setPatient] = useState([]);
  const { identifierRpps } = useParams();

  useEffect(() => {
    const fetchAllPatientByIdentifierRpps = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/patient/${identifierRpps}`
        );
        setPatient(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllPatientByIdentifierRpps();
  }, [identifierRpps]);

  return (
    <table className={styles.tablePractitionerPatientContainer}>
      <thead className={styles.theadContainer}>
        <tr className={styles.trContainer}>
          <th className={styles.theadRowContainer}>Nom du patient</th>
          <th className={styles.theadRowContainer}>Prénom du patient</th>
          <th className={styles.theadRowContainer}>Type d'intervention</th>
          <th className={styles.theadRowContainer}>Date d'intervention</th>
          <th className={styles.theadRowContainer}>Détails</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr className={styles.bodyRowsContainer} key={patient.identifierRpps}>
            <td className={styles.rowsContainer}>
              {patient.patient_first_name}
            </td>
            <td className={styles.rowsContainer}>
              {patient.patient_last_name}
            </td>
            <td className={styles.rowsContainer}>
              {patient.type_intervention}
            </td>
            <td className={styles.rowsContainer}>
              {patient.intervention_date}
            </td>

            <td className={styles.rows}>
              <Link
                to={`/practitioner/patient/infos/${patient.social_secu_number}`}
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

export default PatientListTable;
