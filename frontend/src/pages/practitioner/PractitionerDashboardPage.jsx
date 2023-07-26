import React from "react";
import styles from "./PractitionerDashboardPage.module.css";
import PractitionerDashboard from "../../components/practitionner/PractitionerDashboard/PractitionerDashboard";

function PractitionerDashboardPage() {
  return (
    <div className={styles.dashboardContainer}>
      <PractitionerDashboard />
    </div>
  );
}

export default PractitionerDashboardPage;
