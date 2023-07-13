import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import UnderstandingMobile from "../../components/patient/understandingMobile/UnderstandingMobile";
import styles from "./PatientUnderstandingPage.module.css";
import UnderstepsContext from "../../contexts/UnderstepsContext";

// Définition du composant PatientUnderstandingPage comme une fonction
function PatientUnderstandingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });

  const { setCountOfOnesUstepOne } = useContext(UnderstepsContext);

  const [checkedValues, setCheckedValues] = useState([
    false,
    false,
    false,
    false,
  ]);
  // Utilisation du hook useState pour définir l'état des valeurs cochées des cases à cocher avec une valeur initiale vide
  const [underStepIds, setUnderStepIds] = useState([]); // Utilisation du hook useState pour définir l'état des ID des "underStep" avec une valeur initiale vide
  const { idInter } = useParams(); // Utilisation du hook useParams pour récupérer l'ID de l'intervention depuis les paramètres de l'URL
  useEffect(() => {
    const fetchStep = async () => {
      try {
        // Requête HTTP GET pour récupérer les données des étapes de l'intervention spécifiée
        const response = await axios.get(
          `http://localhost:5050/interventions/${idInter}`
        );
        const { data } = response;

        const ids = data.map((item) => item.id); // Extraction des ID des étapes à partir des données
        const statuts = data.map((item) => item.understepStatut); // Extraction des statuts des "underStep" à partir des données

        const underStepsSubset = ids.slice(0, 4); // Création d'un sous-ensemble des ID des "underStep" (premiers 4)
        const statutsSubset = statuts.slice(0, 4); // Création d'un sous-ensemble des statuts des "underStep" (premiers 4)

        setCheckedValues(statutsSubset); // Mise à jour de l'état des valeurs cochées avec le sous-ensemble des statuts
        setUnderStepIds(underStepsSubset); // Mise à jour de l'état des ID des "underStep" avec le sous-ensemble des ID
      } catch (err) {
        console.error(err); // Affichage de l'erreur dans la console en cas d'échec de la requête
      }
    };

    fetchStep(); // Appel de la fonction fetchStep lors du montage du composant ou lorsque l'ID de l'intervention change
  }, [idInter]);

  const handleChange = (index) => (event) => {
    const { checked } = event.target; // Récupération de la valeur cochée ou décochée de la case à cocher

    setCheckedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = checked; // Mise à jour de la valeur cochée dans le tableau des valeurs cochées
      return newValues;
    });

    const firstFiveUnderStepIds = underStepIds; // Copie des ID des "underStep"

    // Requête HTTP PUT pour mettre à jour le statut de l'étape correspondante
    axios
      .put(`http://localhost:5050/steps/${firstFiveUnderStepIds[index]}`, {
        statutUnderstep: checked ? 1 : 0, // Si la case est cochée, le statut est mis à 1, sinon à 0
      })
      .then(() => {
        if (checked) {
          setCountOfOnesUstepOne((prevCount) => prevCount + 1); // Increment onesCountUstepOne by 1 if checkbox is checked
        } else {
          setCountOfOnesUstepOne((prevCount) => prevCount - 1); // Decrement onesCountUstepOne by 1 if checkbox is unchecked
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err); // Display the error in the console if the request fails
      });
  };

  return (
    <div className={styles.understandingPageContainer}>
      {isTabletOrMobile && <UnderstandingMobile />}
      {isDesktop && (
        <div className={styles.understandingDesktopContainer}>
          <div className={styles.prepContainer}>
            <div className={styles.leftContainer}>
              <p className={styles.docsTitle}>Schémas et documentations</p>
              <div className={styles.docsContainer}>
                <div className={styles.documentCard}>
                  <div className={styles.topCard}>
                    <input
                      type="checkbox"
                      checked={checkedValues[0]}
                      onChange={handleChange(0)}
                    />
                  </div>
                  <div className={styles.bottomCard} />
                </div>
                <div className={styles.documentCard}>
                  <div className={styles.topCard}>
                    <input
                      type="checkbox"
                      checked={checkedValues[1]}
                      onChange={handleChange(1)}
                    />
                  </div>
                  <div className={styles.bottomCard} />
                </div>
                <div className={styles.documentCard}>
                  <div className={styles.topCard}>
                    <input
                      type="checkbox"
                      checked={checkedValues[2]}
                      onChange={handleChange(2)}
                    />
                  </div>
                  <div className={styles.bottomCard} />
                </div>
              </div>
            </div>

            <div className={styles.rightContainer}>
              <p className={styles.docsTitle}>Vidéos</p>
              <div className={styles.videosContainer}>
                <div className={styles.videoCardAndName}>
                  <div className={styles.videoCard}>
                    <div className={styles.topCard}>
                      <input
                        type="checkbox"
                        checked={checkedValues[3]}
                        onChange={handleChange(3)}
                      />
                    </div>
                    <div className={styles.bottomCard} />
                  </div>
                  <div className={styles.videoTextBloc}>
                    <p className={styles.videoName}>Vidéo du Dr Noailles</p>
                    <p className={styles.videoTime}>5 min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Exporte le composant PatientUnderstandingPage par défaut
export default PatientUnderstandingPage;
