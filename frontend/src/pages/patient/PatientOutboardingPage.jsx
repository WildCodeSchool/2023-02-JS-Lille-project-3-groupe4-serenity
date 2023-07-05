import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./PatientOutboardingPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";
import OutboardingMobile from "../../components/patient/outboardingMobile/OutboardingMobile";

function PatientOutboardingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div className={styles.outboardingPageContainer}>
      {isTabletOrMobile && <OutboardingMobile />}
      {isDesktop && <PatientPreparationMenu />}
      <div className={styles.prepContainer} />
    </div>
  );
}

export default PatientOutboardingPage;
