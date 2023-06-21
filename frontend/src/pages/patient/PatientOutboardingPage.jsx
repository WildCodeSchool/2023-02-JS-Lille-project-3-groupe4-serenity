import React from "react";
import styles from "./PatientOutboardingPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";

function PatientOutboardingPage() {
  return (
    <div className={styles.outboardingPageContainer}>
      <PatientPreparationMenu />
      <div className={styles.prepContainer} />
    </div>
  );
}

export default PatientOutboardingPage;
