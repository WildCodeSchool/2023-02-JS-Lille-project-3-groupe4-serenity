import React from "react";
import { Link } from "react-router-dom";
import styles from "./SecretariatInterventionPage.module.css";
import InterventionListTable from "../../components/interventionListTable/InterventionListTable";

function SecretariatInterventionPage() {
  return (
    <div className={styles.interventionsContainer}>
      <div className={styles.buttonsContainer}>
        <h1 className={styles.pageTitle}>Interventions</h1>
        <Link to="/secretariat/intervention/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer}>
        <InterventionListTable />
      </div>
    </div>
  );
}

export default SecretariatInterventionPage;
