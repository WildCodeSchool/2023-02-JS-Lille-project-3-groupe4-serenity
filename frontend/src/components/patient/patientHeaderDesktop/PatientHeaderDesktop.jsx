import React, { useState } from "react";
import { FaRegBell } from "react-icons/fa";
import styles from "./PatientHeaderDesktop.module.css";

function PatientHeaderDesktop() {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const handleNotificationClick = () => {
    setIsNotificationVisible(true);
  };

  const closeNotification = () => {
    setIsNotificationVisible(false);
  };

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
          <FaRegBell
            className={styles.bellIcon}
            onClick={handleNotificationClick}
          />
        </div>
      </div>

      {isNotificationVisible && (
        <div className={styles.notificationPopup}>
          <div className={styles.notificationContent}>
            <h3>Mes Notifications</h3>
            <p>Contenu de la notification</p>
            <button type="button" onClick={closeNotification}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientHeaderDesktop;
