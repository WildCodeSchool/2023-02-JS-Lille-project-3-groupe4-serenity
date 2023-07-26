import React from "react";
import styles from "./PractitionerPatientPage.module.css";
import PractitionerPatient from "../../components/practitionner/PatientPage/PractitionerPatient";

function PractitionerPatientPage() {
  return (
    <div className={styles.patientsContainer}>
      <PractitionerPatient />
    </div>
  );
}

export default PractitionerPatientPage;
