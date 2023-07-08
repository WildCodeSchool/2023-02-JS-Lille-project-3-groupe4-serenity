import React from "react";
import BreatheApp from "../../components/patient/breatheApp/BreatheApp";
import styles from "./PatientBreathePage.module.css";

function PatientBreathePage() {
  return (
    <div className={styles.patientBreathePageContainer}>
      <BreatheApp />
    </div>
  );
}

export default PatientBreathePage;
