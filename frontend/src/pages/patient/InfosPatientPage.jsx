import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styles from "./InfosPatientPage.module.css";
import { FaRegWindowClose } from "react-icons/fa";

function InfosPatientPage() {
  const [patient, setPatient] = useState({});
  const { idInter, idPatient } = useParams();

  useEffect(() => {
    const fectchPatient = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/patients/100001`
        );
        setPatient(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchPatient();
  }, []);

  return (
    <div className={styles.infosPatientPageContainer}>
      <div className={styles.titleAndCloseContainer}>
        <h2 className={styles.title}>Données administratives</h2>
        <Link
          to={`/patient/${idPatient}/${idInter}/understanding/paperwork`}
          className={styles.linkStyle}
        >
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>

      <div className={styles.infosPatientContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.LeftLine}>Nom:</div>
          <div className={styles.LeftLine}>Prénom:</div>
          <div className={styles.LeftLine}>Date de naissance:</div>
          <div className={styles.LeftLine}>N° de sécurité sociale:</div>
          <div className={styles.LeftLine}>Adresse:</div>
          <div className={styles.LeftLine}>Téléphone:</div>
          <div className={styles.LeftLine}>Profession:</div>
          <div className={styles.LeftLine}>Allergie(s):</div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.RightLine}>{patient.first_name}</div>
          <div className={styles.RightLine}>{patient.last_name}</div>
          <div className={styles.RightLine}>?</div>
          <div className={styles.RightLine}>{patient.social_secu_number}</div>
          <div className={styles.RightLine}>
            {patient.address}, {patient.zip_code} {patient.city}
          </div>
          <div className={styles.RightLine}>{patient.phone}</div>
          <div className={styles.RightLine}>{patient.email}</div>
          <div className={styles.RightLine}>{patient.allergy}</div>
        </div>
      </div>
    </div>
  );
}

export default InfosPatientPage;
