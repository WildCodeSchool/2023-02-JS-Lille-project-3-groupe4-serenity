import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./OutboardingMobile.module.css";

function OutboardingMobile() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.outboardingMobileContainer}>
      <div className={styles.progressBarContainer}>
        <p className={styles.blocTitle}>Anticiper ma sortie</p>
        <ProgressBar
          completed={60}
          maxCompleted={100}
          height="8vh"
          borderRadius="20px"
          baseBgColor="var(--green)"
          bgColor="var(--light-green)"
          labelClassName={styles.textProgressBar}
        />
      </div>
      <div className={styles.appointmentBloc}>
        <h1 className={styles.startText}>
          Afin de sécuriser votre retour à la maison votre chirurigien vous
          invite à prendre rendez-vous avec les professionnels de santé suivant
          :
        </h1>
      </div>
      <div>
        <select
          value={selectedOption}
          onChange={handleChange}
          className={styles.menuList}
        >
          <option value="">Sélectionnez un professionnel</option>
          <option value="kinesitherapeute">Option 1</option>
        </select>
      </div>
    </div>
  );
}

export default OutboardingMobile;
