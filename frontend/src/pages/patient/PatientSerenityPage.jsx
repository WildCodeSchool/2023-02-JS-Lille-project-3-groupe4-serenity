import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";
import SerenityMobile from "../../components/patient/serenityMobile/SerenityMobile";
import styles from "./PatientSerenityPage.module.css";

function PatientSerenityPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  const [underStepIds, setUnderStepIds] = useState([]);
  const { idInter } = useParams();

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/interventions/${idInter}`
        );
        const { data } = response;

        // Extrait les ID des étapes dans un tableau
        const ids = data.map((item) => item.id);

        // Met à jour l'état des ID des étapes
        setUnderStepIds(ids);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStep();
  }, [idInter]);

  // Fonction appelée lors du clic sur le bouton de mise à jour
  const handleUpdateClick = (stepId) => {
    axios
      .put(`http://localhost:5050/steps/${stepId}`, {
        statutUnderstep: 1,
      })
      .then(() => {
        console.error("Statut mis à jour avec succès");
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err);
      });
  };

  return (
    <div className={styles.serenityPageContainer}>
      {isTabletOrMobile && <SerenityMobile />}
      {isDesktop && <PatientPreparationMenu />}
      <div className={styles.prepContainer}>
        {underStepIds.slice(9, 12).map((stepId) => (
          <button
            key={stepId}
            type="button"
            onClick={() => handleUpdateClick(stepId)}
          >
            Valider
          </button>
        ))}
      </div>
    </div>
  );
}

export default PatientSerenityPage;
