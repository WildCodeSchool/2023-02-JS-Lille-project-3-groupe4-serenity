import React from "react";
import { useMediaQuery } from "react-responsive";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";
import UnderstandingMobile from "../../components/patient/understandingMobile/UnderstandingMobile";
import styles from "./PatientUnderstandingPage.module.css";

function PatientUnderstandingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  return (
    <div className={styles.understandingPageContainer}>
      {isTabletOrMobile && <UnderstandingMobile />}
      {isDesktop && (
        <div className={styles.understandingDesktopContainer}>
          <PatientPreparationMenu />
          <div className={styles.prepContainer}>
            <div className={styles.leftContainer}>
              <p className={styles.docsTitle}>Schémas et documentations</p>
              <div className={styles.docsContainer}>
                <div className={styles.documentCard} />
                <div className={styles.documentCard} />
                <div className={styles.documentCard} />
                <div className={styles.documentCard} />
                <div className={styles.documentCard} />
              </div>
            </div>

            <div className={styles.rightContainer}>
              <p className={styles.docsTitle}>Vidéos</p>
              <div className={styles.videosContainer}>
                <div className={styles.videoCardAndName}>
                  <div className={styles.videoCard} />
                  <div className={styles.videoTextBloc}>
                    <p className={styles.videoName}>Vidéo du Dr Noailles</p>
                    <p className={styles.videoTime}>5 min</p>
                  </div>
                </div>
                <div className={styles.videoCardAndName}>
                  <div className={styles.videoCard} />
                  <div className={styles.videoTextBloc}>
                    <p className={styles.videoName}></p>
                    <p className={styles.videoTime}></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientUnderstandingPage;
