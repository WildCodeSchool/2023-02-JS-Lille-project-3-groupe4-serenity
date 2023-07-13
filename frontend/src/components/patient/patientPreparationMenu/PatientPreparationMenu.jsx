import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { NavLink, useParams } from "react-router-dom";
import UnderstepsContext from "../../../contexts/UnderstepsContext";
import styles from "./PatientPreparationMenu.module.css";

function PatientPreparationMenu() {
  const { idInter, idPatient } = useParams();

  const {
    countOfOnesUstepOne,
    countOfOnesUstepTwo,
    countOfOnesUstepThree,
    countOfOnesUstepFour,
    countOfOnesUstepFive,
  } = useContext(UnderstepsContext);

  return (
    <div className={styles.prepMenuContainer}>
      <NavLink
        to={`/patient/${idPatient}/${idInter}/understanding`}
        className={({ isActive }) =>
          isActive
            ? `${styles.prepMenuActiveUnderstanding} ${styles.prepMenuActive}`
            : styles.prepMenu
        }
        end
      >
        <div className={styles.progressbarContainer}>
          <CircularProgressbar
            value={(countOfOnesUstepOne / 4) * 100}
            text={`${(countOfOnesUstepOne / 4) * 100}%`}
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
        to={`/patient/${idPatient}/${idInter}/understanding/paperwork`}
        className={({ isActive }) =>
          isActive
            ? `${styles.prepMenuActivePaperwork} ${styles.prepMenuActive}`
            : styles.prepMenu
        }
      >
        <div className={styles.progressbarContainer}>
          <CircularProgressbar
            value={(countOfOnesUstepTwo / 5) * 100}
            text={`${(countOfOnesUstepTwo / 5) * 100}%`}
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
        to={`/patient/${idPatient}/${idInter}/understanding/serenity`}
        className={({ isActive }) =>
          isActive
            ? `${styles.prepMenuActiveSerenity} ${styles.prepMenuActive}`
            : styles.prepMenu
        }
        end
      >
        <div className={styles.progressbarContainer}>
          <CircularProgressbar
            value={Math.floor((countOfOnesUstepThree / 3) * 100)}
            text={`${Math.floor((countOfOnesUstepThree / 3) * 100)}%`}
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
        to={`/patient/${idPatient}/${idInter}/understanding/outboarding`}
        className={({ isActive }) =>
          isActive
            ? `${styles.prepMenuActiveOutboarding} ${styles.prepMenuActive}`
            : styles.prepMenu
        }
        end
      >
        <div className={styles.progressbarContainer}>
          <CircularProgressbar
            value={(countOfOnesUstepFour / 1) * 100}
            text={`${(countOfOnesUstepFour / 1) * 100}%`}
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
        to={`/patient/${idPatient}/${idInter}/understanding/checklist`}
        className={({ isActive }) =>
          isActive
            ? `${styles.prepMenuActiveChecklist} ${styles.prepMenuActive}`
            : styles.prepMenu
        }
        end
      >
        <div className={styles.progressbarContainer}>
          <CircularProgressbar
            value={(countOfOnesUstepFive / 5) * 100}
            text={`${(countOfOnesUstepFive / 5) * 100}%`}
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
