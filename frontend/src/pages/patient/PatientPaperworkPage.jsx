import React from "react";
import styles from "./PatientPaperworkPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/patientPreparationMenu";

function PatientPaperworkPage() {
  return (
    <div className={styles.paperworkPageContainer}>
      <PatientPreparationMenu />
      <div className={styles.prepContainer}></div>
    </div>
  );
}

export default PatientPaperworkPage;
