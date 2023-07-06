import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "./Paperworks.mobile.module.css";

function PaperworksMobile() {
  return (
    <div className={styles.paperworksMobileContainer}>
      <div className={styles.progressBarContainer}>
        <p className={styles.blocTitle}>
          Se débarrasser des formalités administratives
        </p>
        <ProgressBar
          completed={60}
          maxCompleted={100}
          height="8vh"
          borderRadius="20px"
          baseBgColor="var(--turquoise)"
          bgColor="var(--light-turquoise)"
          labelClassName={styles.textProgressBar}
        />
      </div>
      <div className={styles.documentsAndTitleContainer}>
        <p className={styles.blocTitle}>Quelques documents</p>
        <div className={styles.documentsContainer}>
          <div className={styles.topContainer}>
            <div className={styles.textAndDoc}>
              <div className={styles.leftContainer} />
              <h1 className={styles.docTitle}>Fiche administrative</h1>
            </div>
          </div>

          <div className={styles.inlineContainer}>
            <div className={styles.textAndDoc}>
              <div className={styles.leftContainer} />
              <h1 className={styles.docTitle}>Consentement éclairé</h1>
            </div>
            <div className={styles.textAndDoc}>
              <div className={styles.rightContainer} />
              <h1 className={styles.docTitle}>Prise en charge mutuelle</h1>
            </div>
          </div>
          <div className={styles.inlineContainer}>
            <div className={styles.textAndDoc}>
              <div className={styles.leftContainer} />
              <h1 className={styles.docTitle}>Votre anesthésiste ?</h1>
            </div>
            <div className={styles.textAndDoc}>
              <div className={styles.rightContainer} />
              <h1 className={styles.docTitle}>Signature du devis</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaperworksMobile;
