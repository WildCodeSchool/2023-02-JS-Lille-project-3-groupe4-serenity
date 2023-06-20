import React from "react";
import styles from "./PatientChecklistPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/patientPreparationMenu";

function PatientChecklistPage() {
  return (
    <div className={styles.checklistPageContainer}>
      <PatientPreparationMenu />
      <div className={styles.prepContainer}></div>
    </div>
  );
}

export default PatientChecklistPage;
