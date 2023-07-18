import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import SerenityMobile from "../../components/patient/serenityMobile/SerenityMobile";
import styles from "./PatientSerenityPage.module.css";
import UnderstepsContext from "../../contexts/UnderstepsContext";

function PatientSerenityPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  const [page, setPage] = useState(1);

  const [underStepIds, setUnderStepIds] = useState([]);
  const { idInter } = useParams();

  const { countOfOnesUstepThree, setCountOfOnesUstepThree } =
    useContext(UnderstepsContext);

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
        console.error("Statut mis à jour avec succès"); // Display a success message in the console
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

  return (
    <div className={styles.serenityPageContainer}>
      {isTabletOrMobile && <SerenityMobile />}
      {isDesktop && (
        <div className={styles.prepContainer}>
          {page === 1 && (
            <div className={styles.titleAndQuizContainer}>
              <h3 className={styles.stepText}>ETAPE 1 / 3</h3>
              <h4 className={styles.stepTitle}>La douche bétadinée</h4>
              <div className={styles.quizContainer}>
                <div className={styles.leftContainer}>
                  <div
                    className={`${styles.imageContainer} ${styles.imageDouche}`}
                  />
                </div>
                <div className={styles.rightContainer}>
                  <div className={styles.textContainer}>
                    La douche préopératoire est essentielle avant une
                    intervention chirurgicale pour prévenir les infections. Elle
                    réduit le risque infectieux en nettoyant la peau qui abrite
                    naturellement des micro-organismes. La douche doit être
                    effectuée la veille et le matin de l'opération, au plus près
                    de l'intervention. L'hôpital fait tout son possible pour
                    éviter les infections lors des interventions invasives.
                  </div>
                </div>
              </div>
              <div
                className={
                  page === 1
                    ? styles.firstPageButtonContainer
                    : styles.buttonsContainer
                }
              >
                <button
                  className={`${styles.firstNextButton} ${styles.quizButton}`}
                  type="button"
                  onClick={() => handleUpdateClick(underStepIds[7])}
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
          {page === 2 && (
            <div className={styles.titleAndQuizContainer}>
              <h3 className={styles.stepText}>ETAPE 2 / 3</h3>
              <h4 className={styles.stepTitle}>Votre séjour</h4>
              <div className={styles.quizContainer}>
                <div className={styles.leftContainer}>
                  <div
                    className={`${styles.imageContainer} ${styles.imageSejour}`}
                  />
                </div>
                <div className={styles.rightContainer}>
                  <div className={styles.textContainer}>
                    Préparez votre séjour à l'hôpital comme si vous organisiez
                    un voyage. Assurez-vous d'apporter tous les médicaments
                    prescrits par votre chirurgien ou anesthésiste. Veuillez
                    noter que certains médicaments pourraient nécessiter d'être
                    arrêtés, sous conseils d'un professionnel avant
                    l'intervention. Si nécessaire, n'oubliez pas d'apporter les
                    béquilles prescrites.
                  </div>
                </div>
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
            <div className={styles.titleAndQuizContainer}>
              <h3 className={styles.stepText}>ETAPE 3 / 3</h3>
              <h4 className={styles.stepTitle}>Le jour J</h4>
              <div className={styles.quizContainer}>
                <div className={styles.leftContainer}>
                  <div
                    className={`${styles.imageContainer} ${styles.imageJourJ}`}
                  />
                </div>
                <div className={styles.rightContainer}>
                  <div className={styles.textContainer}>
                    Le jour de l'intervention, quelques rappels importants :
                    épilez la zone opérée, respectez le jeûne de 6 heures,
                    évitez de manger, boire et fumer. Suivez les instructions
                    pour les médicaments. Vous pouvez recevoir un anticoagulant
                    pour réduire les risques de complications. Après la
                    prémédication, évitez de vous lever sans accompagnement pour
                    prévenir les chutes.
                  </div>
                </div>
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
                    className={styles.quizButton}
                    type="button"
                    onClick={() => handleUpdateClick(underStepIds[9])}
                  >
                    J'ai compris!
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
      )}
    </div>
  );
}

export default PatientSerenityPage;

/* <div className={styles.prepContainer}>
          {underStepIds.slice(9, 12).map((stepId) => (
            <button
              key={stepId}
              type="button"
              onClick={() => handleUpdateClick(stepId)}
            >
              Valider
            </button>
          ))}
        </div> */
