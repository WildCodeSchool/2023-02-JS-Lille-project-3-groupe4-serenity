import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import ChecklistMobile from "../../components/patient/checklistMobile/ChecklistMobile";
import UnderstepsContext from "../../contexts/UnderstepsContext";
import styles from "./PatientChecklistPage.module.css";

function PatientChecklistPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  const [checkedValues, setCheckedValues] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [underStepIds, setUnderStepIds] = useState([]);
  const { idInter } = useParams();

  const { setCountOfOnesUstepFive } = useContext(UnderstepsContext);

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions/${idInter}`
        );
        const { data } = response;

        const ids = data.map((item) => item.id);
        const statuts = data.map((item) => item.understepStatut);

        const underStepsSubset = ids.slice(11, 16);
        const statutsSubset = statuts.slice(11, 16);

        setCheckedValues(statutsSubset);
        setUnderStepIds(underStepsSubset);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStep();
  }, [idInter]);

  const handleChange = (index) => (event) => {
    const { checked } = event.target;

    setCheckedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = checked;
      return newValues;
    });

    const firstFiveUnderStepIds = underStepIds;

    axios
      .put(`http://localhost:5050/steps/${firstFiveUnderStepIds[index]}`, {
        statutUnderstep: checked ? 1 : 0,
      })

      .then(() => {
        if (checked) {
          setCountOfOnesUstepFive((prevCount) => prevCount + 1); // Increment onesCountUstepOne by 1 if checkbox is checked
        } else {
          setCountOfOnesUstepFive((prevCount) => prevCount - 1); // Decrement onesCountUstepOne by 1 if checkbox is unchecked
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err); // Display the error in the console if the request fails
      });
  };

  return (
    <div className={styles.checklistPageContainer}>
      {isTabletOrMobile && <ChecklistMobile />}
      {isDesktop && (
        <div className={styles.prepContainer}>
          <div className={styles.leftContainer} />
          <div className={styles.rightContainer}>
            <div className={styles.document}>
              <input
                type="checkbox"
                checked={checkedValues[0]}
                onChange={handleChange(0)}
              />
              <div
                className={`${styles.documentInfosBloc} ${
                  checkedValues[0] ? styles.checked : ""
                }`}
              >
                <div className={styles.documentName}>Pièce d'identité</div>
                <div className={styles.documentDetails}>Obligatoire</div>
              </div>
            </div>
            <div className={styles.document}>
              <input
                type="checkbox"
                checked={checkedValues[1]}
                onChange={handleChange(1)}
              />
              <div
                className={`${styles.documentInfosBloc} ${
                  checkedValues[1] ? styles.checked : ""
                }`}
              >
                <div className={styles.documentName}>
                  Consultation anesthésique
                </div>
                <div className={styles.documentDetails}>Obligatoire</div>
              </div>
            </div>
            <div className={styles.document}>
              <input
                type="checkbox"
                checked={checkedValues[2]}
                onChange={handleChange(2)}
              />
              <div
                className={`${styles.documentInfosBloc} ${
                  checkedValues[2] ? styles.checked : ""
                }`}
              >
                <div className={styles.documentName}>
                  Test COVID (de moins de 3 jours)
                </div>
                <div className={styles.documentDetails}>Obligatoire</div>
              </div>
            </div>
            <div className={styles.document}>
              <input
                type="checkbox"
                checked={checkedValues[3]}
                onChange={handleChange(3)}
              />
              <div
                className={`${styles.documentInfosBloc} ${
                  checkedValues[3] ? styles.checked : ""
                }`}
              >
                <div className={styles.documentName}>Mutuelle</div>
                <div className={styles.documentDetails}>Facultatif</div>
              </div>
            </div>
            <div className={styles.document}>
              <input
                type="checkbox"
                checked={checkedValues[4]}
                onChange={handleChange(4)}
              />
              <div
                className={`${styles.documentInfosBloc} ${
                  checkedValues[4] ? styles.checked : ""
                }`}
              >
                <div className={styles.documentName}>Carte Vitale</div>
                <div className={styles.documentDetails}>Obligatoire</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientChecklistPage;
