import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./HeaderMobile.module.css";
import avatarImage from "../../../assets/avatar.avif";

function PatientHeaderMobile() {
  return (
    <div className={styles.headerMobile}>
      <div className={styles.infosPatientContainer}>
        <div className={styles.avatarContainer}>
          <img src={avatarImage} alt="user avatar" className={styles.avatar} />
        </div>
        <div className={styles.nameAndProgressBar}>
          <h3 className={styles.patientName}>Nathalie DURAND</h3>
          <p>Préparation pour ma chirurgie:</p>
          <ProgressBar
            completed={60}
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
          <h4>Lundi 20 Novembre</h4>
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
