import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { useParams } from "react-router-dom";
import UnderstepsContext from "../../../contexts/UnderstepsContext";
import useAuth from "../../../hooks/useAuth";
import formatDate from "../../../services/dateUtils";
import NotificationsModal from "../notificationsModal/NotificationsModal";
import styles from "./PatientHeaderDesktop.module.css";

function PatientHeaderDesktop() {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [progressTotal, setProgressTotal] = useState(0);
  const { auth } = useAuth();
  const { idInter } = useParams();
  const [currentIntervention, setCurrentIntervention] = useState();

  useEffect(() => {
    const fetchCurrentIntervention = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions/${idInter}`
        );
        setCurrentIntervention(response.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurrentIntervention();
  }, []);

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
    if (progressTotal < 100) {
      setIsNotificationVisible(true);
    }
  }, []);

  // Calculate the number of days remaining between today and the procedure date
  const today = new Date();
  const procedureDate = new Date(currentIntervention?.procedure_date);
  const timeDifference = procedureDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <div className={styles.headerContainer}>
      <div className={styles.nameContainer}>
        <p className={styles.name}>Bonjour {auth.firstName}!</p>
        <p className={styles.question}>Comment allez-vous ?</p>
      </div>
      <div className={styles.calendarAndNotifsContainer}>
        <div className={styles.calendarContainer}>
          <div className={styles.remainingDays}>
            <p className={styles.littleText}>Jours</p>
            <p className={styles.daysText}>
              {daysRemaining >= 0 ? daysRemaining : 0}
            </p>
          </div>
          <div className={styles.dateContainer}>
            <p className={styles.normalText}>
              {currentIntervention?.type_intervention}
            </p>
            <p className={styles.practitionerText}>
              Dr. {currentIntervention?.practitioner_last_name}
            </p>
            <p className={styles.littleText}>
              {formatDate(currentIntervention?.procedure_date)}
            </p>
            {/* <p className={styles.hoursText}>10:00</p> */}
          </div>
        </div>

        <div
          className={styles.notificationsContainer}
          onClick={handleNotificationClick}
          onKeyDown={(e) => {
            // Handle keyboard accessibility
            if (e.key === "Enter" || e.key === " ") {
              handleNotificationClick();
            }
          }}
          tabIndex={0} // Add tabIndex to make it focusable
          role="button" // Add the ARIA role
        >
          {isNotificationVisible && (
            <div className={styles.notificationNumber} />
          )}
          <FaRegBell className={styles.bellIcon} />
          {progressTotal === 100 ? (
            <NotificationsModal
              infosText={`Félicitations, Vous êtes à ${progressTotal}% de taux de complétion de vos démarches et êtes maintenant prêt(e) pour votre intervention !`}
            />
          ) : (
            <NotificationsModal
              infosText={`Vous êtes à ${progressTotal}% de taux de complétion de vos démarches, pensez à à toutes les compléter avant votre intervention !`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientHeaderDesktop;
