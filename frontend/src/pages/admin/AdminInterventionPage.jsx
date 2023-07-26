import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminInterventionPage.module.css";
import InterventionListTable from "../../components/interventionListTable/InterventionListTable";

function AdminInterventionPage() {
  return (
    <div className={styles.interventionsContainer}>
      <div className={styles.buttonsContainer}>
        <h1 className={styles.pageTitle}>Interventions</h1>
        <Link to="/admin/intervention/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer}>
        <InterventionListTable currentColor="var(--red)" routeRole="/admin" />
      </div>
    </div>
  );
}

export default AdminInterventionPage;
