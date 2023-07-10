import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PatientPaperworkPage.module.css";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";
import PaperworksMobile from "../../components/patient/paperworksMobile/PaperworksMobile";

function PatientPaperworkPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });
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

        const underStepsSubset = ids.slice(4, 9);
        const statutsSubset = statuts.slice(4, 9);

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
    <div className={styles.paperworkPageContainer}>
      {isTabletOrMobile && <PaperworksMobile />}
      {isDesktop && <PatientPreparationMenu />}
      <div className={styles.prepContainer}>
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

export default PatientPaperworkPage;
