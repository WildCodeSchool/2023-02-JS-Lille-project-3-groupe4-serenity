import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./PractitionerList.module.css";

function PractitionerListTable() {
  const [practitioners, setPractitioners] = useState([]);

  useEffect(() => {
    const fectchAllPractitionner = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/practitioners`
        );
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
          <tr className={styles.bodyRows} key={practitioner.identifier_rpps}>
            <td className={styles.rows}>{practitioner.last_name}</td>
            <td className={styles.rows}>{practitioner.first_name}</td>
            <td className={styles.rows}>{practitioner.speciality}</td>
            <td className={styles.rows}>{practitioner.identifier_rpps}</td>
            <td className={styles.rows}>
              <Link
                to={`/secretariat/practitioner/infos/${practitioner.identifier_rpps}`}
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

export default PractitionerListTable;
