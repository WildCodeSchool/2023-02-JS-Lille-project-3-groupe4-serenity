import React from "react";
import useAuth from "../../hooks/useAuth";
import styles from "./PractitionerInterventionPage.module.css";
import PractitionerIntervention from "../../components/practitionner/InterventionPage/PractitionerIntervention";

function PractitionerInterventionPage() {
  const { auth } = useAuth();

  return (
    <div className={styles.interventionsContainer}>
      <PractitionerIntervention
        currentColor="var(--turquoise"
        routeRole={`/practitioner/interventions/${auth.identifierRpps}`}
      />
    </div>
  );
}

export default PractitionerInterventionPage;
