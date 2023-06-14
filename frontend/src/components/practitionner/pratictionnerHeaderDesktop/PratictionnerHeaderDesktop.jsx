import React from "react";
import styles from "./PratictionnerHeaderDesktop.module.css";
import DateComponent from "../../dateComponent/DateComponent";

function PratictionnerHeaderDesktop() {
  return (
    <div className={styles.headerContainer}>
      Bonjour Docteur
      <DateComponent />
    </div>
  );
}

export default PratictionnerHeaderDesktop;
