import React from "react";
import PatientListTable from "../../components/practitionner/PatientListTable/PatientListTable";
import styles from "./PractitionerPatientPage.module.css";

function PractitionerPatientPage() {
  return (
    <div className={styles.patientsContainer}>
      {" "}
      <PatientListTable />
    </div>
  );
}

export default PractitionerPatientPage;
