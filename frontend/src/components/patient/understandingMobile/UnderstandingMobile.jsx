import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./UnderstandingMobile.module.css";

function UnderstandingMobile() {
  return (
    <div className={styles.understandingMobileContainer}>
      <div className={styles.progressBarContainer}>
        <p className={styles.blocTitle}>Comprendre mon opération</p>
        <ProgressBar
          completed={60}
          maxCompleted={100}
          height="8vh"
          borderRadius="20px"
          baseBgColor="var(--yellow)"
          bgColor="var(--light-yellow)"
          labelClassName={styles.textProgressBar}
        />
      </div>
      <div className={styles.documentsAndTitleContainer}>
        <p className={styles.blocTitle}>Schémas et documentations</p>
        <div className={styles.documentsContainer}>
          <div className={styles.topContainer} />
          <div className={styles.bottomContainer}>
            <div className={styles.leftContainer} />
            <div className={styles.rightContainer} />
          </div>
        </div>
      </div>
      <div className={styles.videosAndTitleContainer}>
        <p className={styles.blocTitle}>Vidéos</p>
        <div className={styles.videoBloc}>
          <div className={styles.videoContainer} />
          <div className={styles.textContainer}>
            <h1 className={styles.videoTitle}>
              Mon chirurgien me parle des croisés.
            </h1>
            <h4 className={styles.videoTime}>3 min</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnderstandingMobile;
