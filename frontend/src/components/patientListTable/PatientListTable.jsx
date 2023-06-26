import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./PatientListTable.module.css";

/* const patients = [
  {
    nom: "Durand",
    prenom: "Nathalie",
    age: 32,
    social_number: 2820259000001,
    id: 1,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 1820259000002,
    id: 2,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 1820259000003,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 1820259000004,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 1820259000005,
  },
  {
    nom: "Durand",
    prenom: "Nathalie",
    age: 32,
    social_number: 2820259000006,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 1820259000007,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 1820259000008,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 1820259000009,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 18202590000010,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 18202590000011,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 18202590000012,
  },
  {
    nom: "Durand",
    prenom: "Michel",
    age: 32,
    social_number: 18202590000013,
  },
]; */

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
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th className={styles.theadRow}>Nom</th>
          <th className={styles.theadRow}>Prénom</th>
          <th className={styles.theadRow}>Âge</th>
          <th className={styles.theadRow}>N°sécurité sociale</th>
          <th className={styles.theadRow}>Détails</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr className={styles.bodyRows} key={patient.social_number}>
            <td className={styles.rows}>{patient.nom}</td>
            <td className={styles.rows}>{patient.prenom}</td>
            <td className={styles.rows}>{patient.age}</td>
            <td className={styles.rows}>{patient.social_number}</td>
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

export default PatientListTable;
