import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./PatientUnderstandingPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";

function PatientUnderstandingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });

  return (
    <div className={styles.understandingPageContainer}>
      {isDesktop && <PatientPreparationMenu />}
      <div className={styles.prepContainer} />
    </div>
  );
}

export default PatientUnderstandingPage;
