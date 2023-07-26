import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import styles from "./PatientListTable.module.css";

function PatientListTable({ currentColor, routeRole }) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fectchAllPatient = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/patients`
        );
        setPatients(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllPatient();
  }, []);

  return (
    <table className={styles.tableContainer}>
      <thead style={{ backgroundColor: currentColor }}>
        <tr style={{ borderBottomColor: currentColor }}>
          <th className={styles.theadRow}>Nom</th>
          <th className={styles.theadRow}>Prénom</th>
          <th className={styles.theadRow}>Âge</th>
          <th className={styles.theadRow}>N°sécurité sociale</th>
          <th className={styles.theadRow}>Détails</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr className={styles.bodyRows} key={patient.social_secu_number}>
            <td className={styles.rows}>{patient.last_name}</td>
            <td className={styles.rows}>{patient.first_name}</td>
            <td className={styles.rows}>{patient.age}</td>
            <td className={styles.rows}>{patient.social_secu_number}</td>
            <td className={styles.rows}>
              <Link
                to={`${routeRole}/patient/infos/${patient.social_secu_number}`}
              >
                <FaEye
                  className={styles.eyeIcon}
                  style={{ color: currentColor }}
                />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

PatientListTable.propTypes = {
  currentColor: PropTypes.string.isRequired,
  routeRole: PropTypes.string.isRequired,
};

export default PatientListTable;
