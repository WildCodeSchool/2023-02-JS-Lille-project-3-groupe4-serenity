import React from "react";
import useAuth from "../../../hooks/useAuth";
import styles from "./SecretariatHeader.module.css";
import DateComponent from "../../dateComponent/DateComponent";

function SecretariatHeader() {
  const { auth } = useAuth();

  return (
    <div className={styles.headerContainer}>
      <div className={styles.infosContainer}>
        Secrétariat <span>({auth.email})</span>
      </div>

      <DateComponent />
    </div>
  );
}

export default SecretariatHeader;
