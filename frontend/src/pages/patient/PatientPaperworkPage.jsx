import React from "react";
import styles from "./PatientPaperworkPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";

function PatientPaperworkPage() {
  return (
    <div className={styles.paperworkPageContainer}>
      <PatientPreparationMenu />
      <div className={styles.prepContainer} />
    </div>
  );
}

export default PatientPaperworkPage;
