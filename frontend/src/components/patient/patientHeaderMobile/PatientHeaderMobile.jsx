import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnderstepsContext from "../../../contexts/UnderstepsContext";
import useAuth from "../../../hooks/useAuth";
import formatDate from "../../../services/dateUtils";
import styles from "./HeaderMobile.module.css";

function PatientHeaderMobile() {
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

  return (
    <div className={styles.headerMobile}>
      <div className={styles.infosPatientContainer}>
        <div className={styles.avatarContainer} />

        <div className={styles.nameAndProgressBar}>
          <h3 className={styles.patientName}>
            {auth?.firstName} {auth?.lastName.toUpperCase()}
          </h3>
          <p>Préparation pour ma chirurgie:</p>
          <ProgressBar
            completed={progressTotal}
            maxCompleted={100}
            height="3vh"
            baseBgColor="var(--medium-grey)"
            bgColor="var(--light-purple)"
            labelClassName={styles.textProgressBar}
          />
        </div>
      </div>
      <div className={styles.dateAndHourContainer}>
        <div className={styles.dateContainer}>
          <p>DATE</p>
          <h4>{formatDate(currentIntervention?.procedure_date)}</h4>
        </div>
        <div className={styles.hourContainer}>
          <p>HEURE</p>
          <h4>09:30</h4>
        </div>
      </div>
    </div>
  );
}

export default PatientHeaderMobile;
