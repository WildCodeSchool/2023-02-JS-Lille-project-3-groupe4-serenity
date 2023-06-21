import React from "react";
import { Link } from "react-router-dom";
import styles from "./SecretariatPatientPage.module.css";

function SecretariatPatientPage() {
  return (
    <div className={styles.patientsContainer}>
      <div className={styles.buttonsContainer}>
        <Link to="/secretariat/patient/ajouter">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer} />
    </div>
  );
}

export default SecretariatPatientPage;
