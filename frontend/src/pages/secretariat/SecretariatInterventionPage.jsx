import React from "react";
import { Link } from "react-router-dom";
import styles from "./SecretariatInterventionPage.module.css";

function SecretariatInterventionPage() {
  return (
    <div className={styles.interventionsContainer}>
      <div className={styles.buttonsContainer}>
        <Link to="/secretariat/intervention/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer} />
    </div>
  );
}

export default SecretariatInterventionPage;
