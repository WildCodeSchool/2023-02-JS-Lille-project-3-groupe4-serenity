import React from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./PatientChecklistPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";
import ChecklistMobile from "../../components/patient/checklistMobile/ChecklistMobile";

function PatientChecklistPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div className={styles.checklistPageContainer}>
      {isTabletOrMobile && <ChecklistMobile />}
      {isDesktop && <PatientPreparationMenu />}
      <div className={styles.prepContainer} />
    </div>
  );
}

export default PatientChecklistPage;
