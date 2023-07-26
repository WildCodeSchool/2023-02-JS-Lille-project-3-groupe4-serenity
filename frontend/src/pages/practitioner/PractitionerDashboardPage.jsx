import React from "react";
import PractitionerDashboard from "../../components/practitionner/PractitionerDashboard/PractitionerDashboard";
import styles from "./PractitionerDashboardPage.module.css";

function PractitionerDashboardPage() {
  return (
    <div className={styles.dashboardContainer}>
      <PractitionerDashboard />
    </div>
  );
}

export default PractitionerDashboardPage;
/* http://localhost:5173/practitioner/1001 */
