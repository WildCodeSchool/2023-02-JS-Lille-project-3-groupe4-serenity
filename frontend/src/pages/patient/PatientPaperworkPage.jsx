import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./PatientPaperworkPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";
import PaperworksMobile from "../../components/patient/paperworksMobile/PaperworksMobile";

function PatientPaperworkPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div className={styles.paperworkPageContainer}>
      {isTabletOrMobile && <PaperworksMobile />}
      {isDesktop && <PatientPreparationMenu />}
      <div className={styles.prepContainer} />
    </div>
  );
}

export default PatientPaperworkPage;
