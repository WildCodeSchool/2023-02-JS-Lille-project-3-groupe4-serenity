import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { NavLink, useParams } from "react-router-dom";
import styles from "./PatientPreparationMenu.module.css";

function PatientPreparationMenu() {
  const percentage = 33;

  const { idInter } = useParams();

  return (
    <div className={styles.prepMenuContainer}>
      <NavLink
        to={`/patient/understanding/initiation/${idInter}`}
        className={({ isActive }) =>
          isActive
            ? `${styles.prepMenuActiveUnderstanding} ${styles.prepMenuActive}`
            : styles.prepMenu
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
          <h1>AAAAAAAA</h1>
        </div>

        <div>Comprendre mon opération</div>
      </NavLink>

      <NavLink
        to={`/patient/understanding/paperwork/${idInter}`}
        className={({ isActive }) =>
          isActive
            ? `${styles.prepMenuActivePaperwork} ${styles.prepMenuActive}`
            : styles.prepMenu
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
        <div>Se débarrasser des formalités administratives</div>
      </NavLink>

      <NavLink
        to={`/patient/understanding/serenity/${idInter}`}
        className={({ isActive }) =>
          isActive
            ? `${styles.prepMenuActiveSerenity} ${styles.prepMenuActive}`
            : styles.prepMenu
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
        to={`/patient/understanding/outboarding/${idInter}`}
        className={({ isActive }) =>
          isActive
            ? `${styles.prepMenuActiveOutboarding} ${styles.prepMenuActive}`
            : styles.prepMenu
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
        to={`/patient/understanding/checklist/${idInter}`}
        className={({ isActive }) =>
          isActive
            ? `${styles.prepMenuActiveChecklist} ${styles.prepMenuActive}`
            : styles.prepMenu
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
