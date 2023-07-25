import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnderstepsContext from "../../../contexts/UnderstepsContext";
import styles from "./SerenityMobile.module.css";

function SerenityMobile() {
  const [underStepIds, setUnderStepIds] = useState([]);
  const { idInter } = useParams();

  const { countOfOnesUstepThree, setCountOfOnesUstepThree } =
    useContext(UnderstepsContext);

  const [page, setPage] = useState(0);

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

  // Fonction appelée lors du clic sur le bouton de mise à jour
  const handleUpdateClick = (stepId) => {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/steps/${stepId}`, {
        statutUnderstep: 1,
      })
      .then(() => {
        if (countOfOnesUstepThree < 3) {
          setCountOfOnesUstepThree((prevCount) => prevCount + 1); // Increment onesCountUstepOne by 1 if checkbox is checked
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err); // Display the error in the console if the request fails
      });
    if (page < 3) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className={styles.serenityMobileContainer}>
      <div className={styles.progressBarContainer}>
        <p className={styles.blocTitle}>Préparer mon arrivée</p>
        <ProgressBar
          completed={Math.floor((countOfOnesUstepThree / 3) * 100)}
          maxCompleted={100}
          height="8vh"
          borderRadius="20px"
          baseBgColor="var(--pink)"
          bgColor="var(--light-pink)"
          labelClassName={styles.textProgressBar}
        />
      </div>
      <div className={styles.quizBloc}>
        {page === 0 && (
          <div className={styles.startPage}>
            <h1 className={styles.startText}>
              Préparons nous à vivre la journée de l'intervention une première
              fois afin d'arriver le plus sereinemment possible le jour J.
            </h1>
            <button
              className={styles.quizButton}
              type="button"
              onClick={handleNext}
            >
              Je commence !
            </button>
          </div>
        )}
        {page === 1 && (
          <div className={styles.quizFirst}>
            <h3 className={styles.stepText}>ETAPE 1 / 3</h3>
            <h4 className={styles.stepTitle}>La douche bétadinée</h4>
            <div className={styles.stepContent}>
              La douche préopératoire est essentielle avant une intervention
              chirurgicale pour prévenir les infections. Elle réduit le risque
              infectieux en nettoyant la peau qui abrite naturellement des
              micro-organismes. La douche doit être effectuée la veille et le
              matin de l'opération, au plus près de l'intervention. L'hôpital
              fait tout son possible pour éviter les infections lors des
              interventions invasives.
            </div>
            <div className={styles.buttonsContainer}>
              <button
                className={`${styles.quizButton} ${styles.previousButton}`}
                type="button"
                onClick={handlePrevious}
              >
                Précédent
              </button>
              <button
                className={styles.quizButton}
                type="button"
                onClick={() => handleUpdateClick(underStepIds[7])}
              >
                Suivant
              </button>
            </div>
          </div>
        )}
        {page === 2 && (
          <div className={styles.quizFirst}>
            <h3 className={styles.stepText}>ETAPE 2 / 3</h3>
            <h4 className={styles.stepTitle}>Votre séjour</h4>
            <div className={styles.stepContent}>
              Préparez votre séjour à l'hôpital comme si vous organisiez un
              voyage. Assurez-vous d'apporter tous les médicaments prescrits par
              votre chirurgien ou anesthésiste. Veuillez noter que certains
              médicaments pourraient nécessiter d'être arrêtés, sous conseils
              d'un professionnel avant l'intervention. Si nécessaire, n'oubliez
              pas d'apporter les béquilles prescrites.
            </div>
            <div className={styles.buttonsContainer}>
              <button
                className={`${styles.quizButton} ${styles.previousButton}`}
                type="button"
                onClick={handlePrevious}
              >
                Précédent
              </button>
              <button
                className={styles.quizButton}
                type="button"
                onClick={() => handleUpdateClick(underStepIds[8])}
              >
                Suivant
              </button>
            </div>
          </div>
        )}
        {page === 3 && (
          <div className={styles.quizFirst}>
            <h3 className={styles.stepText}>ETAPE 3 / 3</h3>
            <h4 className={styles.stepTitle}>Le jour J</h4>
            <div className={styles.stepContent}>
              Le jour de l'intervention, quelques rappels importants : épilez la
              zone opérée, respectez le jeûne de 6 heures, évitez de manger,
              boire et fumer. Suivez les instructions pour les médicaments. Vous
              pouvez recevoir un anticoagulant pour réduire les risques de
              complications. Après la prémédication, évitez de vous lever sans
              accompagnement pour prévenir les chutes.
            </div>
            <div className={styles.buttonsContainer}>
              <button
                className={`${styles.quizButton} ${styles.previousButton}`}
                type="button"
                onClick={handlePrevious}
              >
                Précédent
              </button>
              {countOfOnesUstepThree < 3 ? (
                <button
                  className={`${styles.quizButton}`}
                  type="button"
                  onClick={() => handleUpdateClick(underStepIds[9])}
                >
                  J'ai compris
                </button>
              ) : (
                <button
                  className={`${styles.quizButton} ${styles.endButton}`}
                  type="button"
                >
                  Terminé
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SerenityMobile;
