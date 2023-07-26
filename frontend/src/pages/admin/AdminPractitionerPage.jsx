import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminPractitionerPage.module.css";
import PractitionerListTable from "../../components/practitionerListTable/PractitionerListTable";

function AdminPractitionerPage() {
  return (
    <div className={styles.practitionerContainer}>
      <div className={styles.buttonsContainer}>
        <h1 className={styles.pageTitle}>Practiciens</h1>
        <Link to="/admin/practitioner/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer}>
        <PractitionerListTable currentColor="var(--red)" routeRole="/admin" />
      </div>
    </div>
  );
}

export default AdminPractitionerPage;
