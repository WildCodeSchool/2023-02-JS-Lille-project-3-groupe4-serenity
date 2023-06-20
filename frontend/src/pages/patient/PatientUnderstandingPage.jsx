import React from "react";
import styles from "./PatientUnderstandingPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/patientPreparationMenu";

function PatientUnderstandingPage() {
  return (
    <div className={styles.understandingPageContainer}>
      <PatientPreparationMenu />
      <div className={styles.prepContainer}></div>
    </div>
  );
}

export default PatientUnderstandingPage;
