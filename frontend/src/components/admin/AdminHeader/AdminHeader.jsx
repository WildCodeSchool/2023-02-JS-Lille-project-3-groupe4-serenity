import React from "react";
import styles from "./AdminHeader.module.css";
import DateComponent from "./dateComponent/DateComponent";

function AdminHeader() {
  return (
    <div className={styles.headerContainer}>
      Bonjour Docteur
      <DateComponent />
    </div>
  );
}

export default AdminHeader;
