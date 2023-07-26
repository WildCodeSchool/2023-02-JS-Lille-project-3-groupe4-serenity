import React from "react";
import styles from "./PractitionerInterventionPage.module.css";
import InterventionListTable from "../../components/practitionner/InterventionListTable/InterventionListTable";

function PractitionerInterventionPage() {
  return (
    <div className={styles.interventionsContainer}>
      <InterventionListTable />
    </div>
  );
}

export default PractitionerInterventionPage;
