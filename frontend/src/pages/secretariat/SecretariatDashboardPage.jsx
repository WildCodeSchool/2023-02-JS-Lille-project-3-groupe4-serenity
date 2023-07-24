import React from "react";
import styles from "./SecretariatDashboardPage.module.css";
import SecretariatDashboard from "../../components/secretariat/secretariatDashboard/SecretariatDashboard";

function SecretariatDashboardPage() {
  return (
    <div className={styles.dashboardPageContainer}>
      <SecretariatDashboard />
    </div>
  );
}

export default SecretariatDashboardPage;
