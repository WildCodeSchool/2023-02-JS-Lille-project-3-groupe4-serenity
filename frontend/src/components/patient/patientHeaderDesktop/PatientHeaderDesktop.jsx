import React, { useEffect, useState, useContext } from "react";
import { FaRegBell } from "react-icons/fa";
import NotificationsModal from "../notificationsModal/NotificationsModal";
import styles from "./PatientHeaderDesktop.module.css";
import UnderstepsContext from "../../../contexts/UnderstepsContext";

function PatientHeaderDesktop() {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [progressTotal, setProgressTotal] = useState(0);

  const handleNotificationClick = () => {
    setIsNotificationVisible(false);
  };

  const {
    countOfOnesUstepOne,
    countOfOnesUstepTwo,
    countOfOnesUstepThree,
    countOfOnesUstepFour,
    countOfOnesUstepFive,
  } = useContext(UnderstepsContext);

  useEffect(() => {
    const sum =
      countOfOnesUstepOne +
      countOfOnesUstepTwo +
      countOfOnesUstepThree +
      countOfOnesUstepFour +
      countOfOnesUstepFive;

    const percentage = Math.round((sum / 16) * 100);
    setProgressTotal(percentage);
  }, [
    countOfOnesUstepOne,
    countOfOnesUstepTwo,
    countOfOnesUstepThree,
    countOfOnesUstepFour,
    countOfOnesUstepFive,
  ]);

  useEffect(() => {
    if (progressTotal !== 16) {
      setIsNotificationVisible(true);
    }
  }, []);

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

        <button
          className={styles.notificationsContainer}
          type="button"
          onClick={handleNotificationClick}
        >
          {isNotificationVisible && (
            <div className={styles.notificationNumber} />
          )}
          <FaRegBell className={styles.bellIcon} />
          <NotificationsModal
            infosText={`Vous êtes à ${progressTotal}% de taux de complétion de vos démarches, pensez à à toutes les compléter avant votre intervention !`}
          />
        </button>
      </div>
    </div>
  );
}

export default PatientHeaderDesktop;
