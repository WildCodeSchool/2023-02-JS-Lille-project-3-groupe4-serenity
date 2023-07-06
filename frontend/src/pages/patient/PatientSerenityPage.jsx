import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./PatientSerenityPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";
import SerenityMobile from "../../components/patient/serenityMobile/SerenityMobile";

function PatientSerenityPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div className={styles.serenityPageContainer}>
      {isTabletOrMobile && <SerenityMobile />}
      {isDesktop && <PatientPreparationMenu />}
      <div className={styles.prepContainer} />
    </div>
  );
}

export default PatientSerenityPage;
