import React from "react";
import styles from "./PractitionerPatientPage.module.css";
import PatientListTable from "../../components/practitionner/PatientListTable/PatientListTable";

function PractitionerPatientPage() {
  return (
    <div className={styles.patientsContainer}>
      <PatientListTable />
    </div>
  );
}

export default PractitionerPatientPage;
