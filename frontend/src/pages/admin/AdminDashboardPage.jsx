import React from "react";
import styles from "./AdminDashboardPage.module.css";
import SecretariatDashboard from "../../components/secretariat/secretariatDashboard/SecretariatDashboard";

function AdminDashboardPage() {
  return (
    <div className={styles.dashboardPageContainer}>
      <SecretariatDashboard />
    </div>
  );
}

export default AdminDashboardPage;
