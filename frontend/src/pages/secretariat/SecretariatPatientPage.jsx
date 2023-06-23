import React from "react";
import { Link } from "react-router-dom";
import styles from "./SecretariatPatientPage.module.css";
import PatientListTable from "../../components/patientListTable/PatientListTable";

function SecretariatPatientPage() {
  return (
    <div className={styles.patientsContainer}>
      <div className={styles.buttonsContainer}>
        <Link to="/secretariat/patient/add">
          <button type="button" className={styles.addButton}>
            Ajouter
          </button>
        </Link>
      </div>
      <div className={styles.dataContainer}>
        {" "}
        <PatientListTable />
      </div>
    </div>
  );
}

export default SecretariatPatientPage;
