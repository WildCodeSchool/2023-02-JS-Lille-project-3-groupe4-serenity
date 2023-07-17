import React, { useEffect, useState, useContext } from "react";
import { FaRegBell } from "react-icons/fa";
import styles from "./PatientHeaderDesktop.module.css";
import UnderstepsContext from "../../../contexts/UnderstepsContext";

function PatientHeaderDesktop() {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [progressTotal, setProgressTotal] = useState(0);

  const handleNotificationClick = () => {
    setIsNotificationVisible(true);
  };

  const closeNotification = () => {
    setIsNotificationVisible(false);
  };

  const {
    countOfOnesUstepOne,
    countOfOnesUstepTwo,
    countOfOnesUstepThree,
    countOfOnesUstepFour,
    countOfOnesUstepFive,
  } = useContext(UnderstepsContext);

  const c1 = (countOfOnesUstepOne / 2) * 100;
  const c2 = (countOfOnesUstepTwo / 5) * 100;
  const c3 = (countOfOnesUstepThree / 3) * 100;
  const c4 = (countOfOnesUstepFour / 1) * 100;
  const c5 = (countOfOnesUstepFive / 3) * 100;

  useEffect(() => {
    // Calcul de l'avancement total
    const progressArray = [c1, c2, c3, c4, c5];
    const totalProgress =
      progressArray.reduce((sum, progress) => sum + progress, 0) /
      progressArray.length;
    setProgressTotal(Math.round(totalProgress)); // Arrondir au nombre entier le plus proche

    setIsNotificationVisible(totalProgress !== 100);
  }, [c1, c2, c3, c4, c5]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.nameContainer}>
        <p className={styles.name}>Bonjour [Name]!</p>
        <p className={styles.question}>Comment allez-vous ?</p>
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
            <p>Avancement total : {progressTotal}%</p>
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
