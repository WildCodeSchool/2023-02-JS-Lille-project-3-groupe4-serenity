import React from "react";
import styles from "./SecretariatHeader.module.css";
import DateComponent from "../../dateComponent/DateComponent";

function SecretariatHeader() {
  return (
    <div className={styles.headerContainer}>
      Bonjour !
      <DateComponent />
    </div>
  );
}

export default SecretariatHeader;
