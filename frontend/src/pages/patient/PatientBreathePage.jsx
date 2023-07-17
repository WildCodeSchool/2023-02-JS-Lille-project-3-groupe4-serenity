import React from "react";
import { useMediaQuery } from "react-responsive";
import BreatheApp from "../../components/patient/breatheApp/BreatheApp";
import styles from "./PatientBreathePage.module.css";

function PatientBreathePage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div className={styles.patientBreathePageContainer}>
      {isTabletOrMobile && <BreatheApp />}
      {isDesktop && (
        <div className={styles.prepContainer}>
          <div className={styles.imageContainer} />
          <div className={styles.breatheContainer}>
            {" "}
            <BreatheApp />
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientBreathePage;
