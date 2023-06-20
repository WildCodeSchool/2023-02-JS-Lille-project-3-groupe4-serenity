import React from "react";
import styles from "./PatientOutboardingPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/patientPreparationMenu";

const PatientOutboardingPage = () => {
  return (
    <div className={styles.outboardingPageContainer}>
      <PatientPreparationMenu />
      <div className={styles.prepContainer}></div>
    </div>
  );
};

export default PatientOutboardingPage;
