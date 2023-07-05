import React, { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./SerenityMobile.module.css";

function SerenityMobile() {
  const [page, setPage] = useState(0);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className={styles.serenityMobileContainer}>
      <div className={styles.progressBarContainer}>
        <p className={styles.blocTitle}>Préparer mon arrivée</p>
        <ProgressBar
          completed={60}
          maxCompleted={100}
          height="8vh"
          borderRadius="20px"
          baseBgColor="var(--pink)"
          bgColor="var(--light-pink)"
          labelClassName={styles.textProgressBar}
        />
      </div>
      <div className={styles.quizBloc}>
        {page === 0 && (
          <div className={styles.startPage}>
            <h1 className={styles.startText}>
              Préparons nous à vivre la journée de l'intervention une première
              fois afin d'arriver le plus sereinemment possible le jour J.
            </h1>
            <button
              className={styles.quizButton}
              type="button"
              onClick={handleNext}
            >
              Je commence !
            </button>
          </div>
        )}
        {page === 1 && (
          <div className={styles.quizFirst}>
            <h3 className={styles.stepText}>ETAPE 1 / 3</h3>
            <h4 className={styles.stepTitle}>La douche bétadinée</h4>
            <div className={styles.stepContent} />
            <div className={styles.buttonsContainer}>
              <button
                className={`${styles.quizButton} ${styles.previousButton}`}
                type="button"
                onClick={handlePrevious}
              >
                Précédent
              </button>
              <button
                className={styles.quizButton}
                type="button"
                onClick={handleNext}
              >
                Suivant
              </button>
            </div>
          </div>
        )}
        {page === 2 && (
          <div className={styles.quizFirst}>
            <h3 className={styles.stepText}>ETAPE 2 / 3</h3>
            <h4 className={styles.stepTitle}>???</h4>
            <div className={styles.stepContent} />
            <div className={styles.buttonsContainer}>
              <button
                className={`${styles.quizButton} ${styles.previousButton}`}
                type="button"
                onClick={handlePrevious}
              >
                Précédent
              </button>
              <button
                className={styles.quizButton}
                type="button"
                onClick={handleNext}
              >
                Suivant
              </button>
            </div>
          </div>
        )}
        {page === 3 && (
          <div className={styles.quizFirst}>
            <h3 className={styles.stepText}>ETAPE 3 / 3</h3>
            <h4 className={styles.stepTitle}>???</h4>
            <div className={styles.stepContent} />
            <div className={styles.buttonsContainer}>
              <button
                className={`${styles.quizButton} ${styles.previousButton}`}
                type="button"
                onClick={handlePrevious}
              >
                Précédent
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SerenityMobile;
