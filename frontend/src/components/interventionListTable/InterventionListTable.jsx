import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import formatDate from "../../services/dateUtils";
import styles from "./InterventionListTable.module.css";

function InterventionListTable({ currentColor, routeRole }) {
  const [interventions, setInterventions] = useState([]);

  useEffect(() => {
    const fectchAllInterventions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions`
        );
        setInterventions(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllInterventions();
  }, []);

  return (
    <table className={styles.tableContainer}>
      <thead style={{ backgroundColor: currentColor }}>
        <tr style={{ borderBottomColor: currentColor }}>
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
            <td className={styles.rows}>{intervention.typeIntervention}</td>
            <td className={styles.rows}>
              {formatDate(intervention.dateIntervention)}
            </td>
            <td className={styles.rows}>
              <Link
                to={`${routeRole}/intervention/infos/${intervention.id_intervention}`}
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

InterventionListTable.propTypes = {
  currentColor: PropTypes.string.isRequired,
  routeRole: PropTypes.string.isRequired,
};

export default InterventionListTable;
