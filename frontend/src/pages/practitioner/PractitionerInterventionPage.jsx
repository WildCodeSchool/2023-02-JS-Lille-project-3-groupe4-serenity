import React from "react";
import InterventionListTable from "../../components/practitionner/InterventionListTable/InterventionListTable";
import styles from "./PractitionerInterventionPage.module.css";

function PractitionerInterventionPage() {
  return (
    <div className={styles.interventionsContainer}>
      <InterventionListTable />
    </div>
  );
}

export default PractitionerInterventionPage;
