import ProgressBar from "@ramonak/react-progress-bar";
import React from "react";
import { BsChevronRight } from "react-icons/bs";
import styles from "./Checklist.module.css";

function ChecklistMobile() {
  return (
    <div className={styles.checklistMobilePageContainer}>
      <div className={styles.progressBarContainer}>
        <p className={styles.blocTitle}>Anticiper ma sortie</p>
        <ProgressBar
          completed={60}
          maxCompleted={100}
          height="8vh"
          borderRadius="20px"
          baseBgColor="var(--main-purple)"
          bgColor="var(--light-purple)"
          labelClassName={styles.textProgressBar}
        />
      </div>
      <div className={styles.documentsContainer}>
        <div className={styles.document}>
          <input type="checkbox" />
          <div className={styles.documentInfosBloc}>
            <div className={styles.documentName}>Pièce d'identité</div>
            <div className={styles.documentDetails}>Obligatoire</div>
          </div>
          <div className={styles.rightIconBloc}>
            <BsChevronRight className={styles.rightIcon} />
          </div>
        </div>
        <div className={styles.document}>
          <input type="checkbox" />
        </div>
        <div className={styles.document}>
          <input type="checkbox" />
        </div>
        <div className={styles.document}>
          <input type="checkbox" />
        </div>
        <div className={styles.document}>
          <input type="checkbox" />
        </div>
      </div>
    </div>
  );
}

export default ChecklistMobile;
