import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import OutboardingMobile from "../../components/patient/outboardingMobile/OutboardingMobile";
import UnderstepsContext from "../../contexts/UnderstepsContext";
import styles from "./PatientUnderstandingPage.module.css";

function PatientOutboardingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });
  const [underStepIds, setUnderStepIds] = useState([]);
  const { idInter } = useParams();

  const { countOfOnesUstepFour, setCountOfOnesUstepFour } =
    useContext(UnderstepsContext);

  // Effectue une requête HTTP GET pour récupérer les données des étapes
  useEffect(() => {
    const fetchStep = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/interventions/${idInter}`
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
        if (countOfOnesUstepFour < 1) {
          setCountOfOnesUstepFour((prevCount) => prevCount + 1); // Increment onesCountUstepOne by 1 if checkbox is checked
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err); // Display the error in the console if the request fails
      });
  };

  return (
    <div className={styles.outboardingPageContainer}>
      {isTabletOrMobile && <OutboardingMobile />}
      {isDesktop && (
        <div className={styles.prepContainer}>
          <div>
            <button type="button" onClick={handleUpdateClick}>
              Valider
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientOutboardingPage;
