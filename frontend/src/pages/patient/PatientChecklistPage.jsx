import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styles from "./PatientChecklistPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";

function PatientChecklistPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const [checkedValues, setCheckedValues] = useState([]);
  const [underStepIds, setUnderStepIds] = useState([]);
  const { idInter } = useParams();

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/interventions/${idInter}`
        );
        const { data } = response;

        const ids = data.map((item) => item.id);
        const statuts = data.map((item) => item.understepStatut);

        const underStepsSubset = ids.slice(13, 18);
        const statutsSubset = statuts.slice(13, 18);

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
        console.error("Statut mis à jour avec succès");
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err);
      });
  };

  return (
    <div className={styles.understandingPageContainer}>
      <h2>hhhhh</h2>
      <div className={styles.understandingPageContainer}>
        {isDesktop && <PatientPreparationMenu />}
        <div className={styles.prepContainer} />
        <h1> jjjjjj</h1>
        <div>
          {underStepIds.map((id, index) => (
            <div key={id}>
              <input
                id={id}
                type="checkbox"
                checked={checkedValues[index]}
                onChange={handleChange(index)}
              />
              <label>Value {index + 1}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientChecklistPage;
