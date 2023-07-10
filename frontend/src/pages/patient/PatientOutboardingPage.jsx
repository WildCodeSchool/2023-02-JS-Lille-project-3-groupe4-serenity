import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu";
import styles from "./PatientUnderstandingPage.module.css";

function PatientUnderstandingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const [underStepIds, setUnderStepIds] = useState([]);
  const { idInter } = useParams();

  // Effectue une requête HTTP GET pour récupérer les données des étapes
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
  const firstFiveUnderStepIds = underStepIds.slice(12, 13);

  // Fonction appelée lors du clic sur le bouton de mise à jour
  const handleUpdateClick = () => {
    axios
      .put(`http://localhost:5050/steps/${firstFiveUnderStepIds}`, {
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
    <div className={styles.understandingPageContainer}>
      <h2>hhhhh</h2>
      <div className={styles.understandingPageContainer}>
        {isDesktop && <PatientPreparationMenu />}
        <div className={styles.prepContainer} />
        <h1> jjjjjj</h1>
        <div>
          <button type="button" onClick={handleUpdateClick}>
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientUnderstandingPage;
