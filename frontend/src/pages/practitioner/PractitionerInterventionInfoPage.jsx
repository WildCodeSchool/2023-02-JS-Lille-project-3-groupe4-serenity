import React from "react";
import styles from "./PractitionerInterventionPage.module.css";
import PractitionerIntervention from "../../components/practitionner/InterventionPage/PractitionerIntervention";

function PractitionerInterventionPage() {
  return (
    <div className={styles.interventionsContainer}>
      <PractitionerIntervention />
    </div>
  );
}

export default PractitionerInterventionPage;
