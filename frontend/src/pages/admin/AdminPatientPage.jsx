import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminPatientPage.module.css";
import PatientListTable from "../../components/patientListTable/PatientListTable";

function AdminPatientPage() {
  return (
    <div className={styles.patientsContainer}>
      <div className={styles.buttonsContainer}>
        <h1 className={styles.pageTitle}>Patients</h1>
        <Link to="/admin/patient/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer}>
        {" "}
        <PatientListTable currentColor="var(--red)" routeRole="/admin" />
      </div>
    </div>
  );
}

export default AdminPatientPage;
