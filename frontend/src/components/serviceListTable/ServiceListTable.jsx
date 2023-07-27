import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import styles from "./ServiceListTable.module.css";

function ServiceListTable({ currentColor, routeRole }) {
  const [service, setservice] = useState([]);

  useEffect(() => {
    const fecthAllservice = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/service`
        );
        setservice(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fecthAllservice();
  }, []);

  return (
    <table className={styles.tableContainer}>
      <thead style={{ backgroundColor: currentColor }}>
        <tr style={{ borderBottomColor: currentColor }}>
          <th className={styles.theadRow}>Nom de Service</th>
          <th className={styles.theadRow}>Batiment</th>
          <th className={styles.theadRow}>Etage</th>
          <th className={styles.theadRow}>Nombre de practiciens</th>
          <th className={styles.theadRow}>Détails</th>
        </tr>
      </thead>
      <tbody>
        {service.map((services) => (
          <tr className={styles.bodyRows} key={services.nom_du_service}>
            <td className={styles.rows}>{services.nom_du_service}</td>
            <td className={styles.rows}>{services.batiment}</td>
            <td className={styles.rows}>{services.etage}</td>
            <td className={styles.rows}>{services.nombre_de_practiciens}</td>
            <td className={styles.rows}>
              <Link
                to={`${routeRole}/services/infos/${services.nom_du_service}`}
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

ServiceListTable.propTypes = {
  currentColor: PropTypes.string.isRequired,
  routeRole: PropTypes.string.isRequired,
};

export default ServiceListTable;
