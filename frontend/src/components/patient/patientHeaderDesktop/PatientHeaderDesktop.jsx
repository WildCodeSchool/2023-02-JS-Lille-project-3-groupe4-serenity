import React from "react";
import styles from "./PatientHeaderDesktop.module.css";
import { FaRegBell } from "react-icons/fa";

function PatientHeaderDesktop() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.nameContainer}>
        <p className={styles.name}>Bonjour [Name]!</p>
        <p className={styles.question}>Comment allez vous ?</p>
      </div>
      <div className={styles.calendarAndNotifsContainer}>
        <div className={styles.calendarContainer}>
          <div className={styles.remainingDays}>
            <p className={styles.littleText}>Jours</p>
            <p className={styles.daysText}>20</p>
          </div>
          <div className={styles.dateContainer}>
            <p className={styles.normalText}> Ma Chirurgie</p>
            <p className={styles.littleText}>Lundi 20 novembre</p>
            <p className={styles.hoursText}>10:00</p>
          </div>
        </div>

        <div className={styles.notificationsContainer}>
          <FaRegBell className={styles.bellIcon} />
        </div>
      </div>
    </div>
  );
}

export default PatientHeaderDesktop;
