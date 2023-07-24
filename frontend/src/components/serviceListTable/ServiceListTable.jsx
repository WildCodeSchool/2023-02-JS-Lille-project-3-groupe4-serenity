import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./ServiceListTable.module.css";

function ServiceListTable() {
  const [service, setservice] = useState([]);

  useEffect(() => {
    const fecthAllservice = async () => {
      try {
        const response = await axios.get("http://localhost:5050/service");
        setservice(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fecthAllservice();
  }, []);

  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th className={styles.theadRow}>Nom de Service</th>
          <th className={styles.theadRow}>Batiment</th>
          <th className={styles.theadRow}>Etage</th>
          <th className={styles.theadRow}>Nombre de practiciens</th>
          <th className={styles.theadRow}>Détails</th>
        </tr>
      </thead>
      <tbody>
        {service.map((services) => (
          <tr className={styles.bodyRows} key={services.nom_service}>
            <td className={styles.rows}>{services.nom_service}</td>
            <td className={styles.rows}>{services.batiment}</td>
            <td className={styles.rows}>{services.etage}</td>
            <td className={styles.rows}>{services.nombre_de_practiciens}</td>
            <td className={styles.rows}>
              <Link to={`/secretariat/service/infos/${services.nom_service}`}>
                <FaEye className={styles.eyeIcon} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ServiceListTable;
