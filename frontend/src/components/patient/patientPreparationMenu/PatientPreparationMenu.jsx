import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { NavLink } from "react-router-dom";
import styles from "./PatientPreparationMenu.module.css";

function PatientPreparationMenu() {
  const percentage = 33;

  return (
    <div className={styles.prepMenuContainer}>
      <NavLink
        to="/patient/understanding"
        className={({ isActive }) =>
          isActive ? styles.prepMenuActiveUnderstanding : styles.prepMenu
        }
        end
      >
        <div className={styles.progressbarContainer}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "black",
              pathColor: "var(--light-yellow)",
              trailColor: "var(--yellow)",
            })}
          />
        </div>

        <div>Comprendre mon opération</div>
      </NavLink>
      <NavLink
        to="/patient/understanding/paperwork"
        className={({ isActive }) =>
          isActive ? styles.prepMenuActivePaperwork : styles.prepMenu
        }
        end
      >
        <div className={styles.progressbarContainer}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "black",
              pathColor: "var(--light-turquoise)",
              trailColor: "var(--turquoise)",
            })}
          />
        </div>
        <div>Se débarasser des formalitées administrative</div>
      </NavLink>
      <NavLink
        to="/patient/understanding/serenity"
        className={({ isActive }) =>
          isActive ? styles.prepMenuActiveSerenity : styles.prepMenu
        }
        end
      >
        <div className={styles.progressbarContainer}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "black",
              pathColor: "var(--light-pink)",
              trailColor: "var(--pink)",
            })}
          />
        </div>
        <div>Préparer mon arrivée en toute sérénité</div>
      </NavLink>
      <NavLink
        to="/patient/understanding/outboarding"
        className={({ isActive }) =>
          isActive ? styles.prepMenuActiveOutboarding : styles.prepMenu
        }
        end
      >
        <div className={styles.progressbarContainer}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "black",
              pathColor: "var(--light-green)",
              trailColor: "var(--green)",
            })}
          />
        </div>
        <div>Anticiper ma sortie</div>
      </NavLink>
      <NavLink
        to="/patient/understanding/checklist"
        className={({ isActive }) =>
          isActive ? styles.prepMenuActiveChecklist : styles.prepMenu
        }
        end
      >
        <div className={styles.progressbarContainer}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "black",
              pathColor: "var(--light-purple)",
              trailColor: "var(--main-purple)",
            })}
          />
        </div>
        <div>Ma checklist avant mon départ pour la clinique</div>
      </NavLink>
    </div>
  );
}

export default PatientPreparationMenu;
