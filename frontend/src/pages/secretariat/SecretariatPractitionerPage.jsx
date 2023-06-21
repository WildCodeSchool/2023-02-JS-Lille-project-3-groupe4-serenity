import React from "react";
import { Link } from "react-router-dom";
import styles from "./SecretariatPractitionerPage.module.css";

function SecretariatPractitionerPage() {
  return (
    <div className={styles.practitionerContainer}>
      <div className={styles.buttonsContainer}>
        <Link to="/secretariat/practitioner/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer} />
    </div>
  );
}

export default SecretariatPractitionerPage;
