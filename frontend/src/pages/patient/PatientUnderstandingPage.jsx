// Importation des dépendances nécessaires
import axios from "axios"; // Importation du module axios pour effectuer des requêtes HTTP
import React, { useEffect, useState } from "react"; // Importation de React et des hooks useEffect et useState
import { useParams } from "react-router-dom"; // Importation du hook useParams pour récupérer les paramètres de l'URL
import { useMediaQuery } from "react-responsive"; // Importation du hook useMediaQuery pour détecter la taille de l'écran
import PatientPreparationMenu from "../../components/patient/patientPreparationMenu/PatientPreparationMenu"; // Importation d'un composant PatientPreparationMenu
import styles from "./PatientUnderstandingPage.module.css"; // Importation des styles spécifiques pour le composant

// Définition du composant PatientUnderstandingPage comme une fonction
function PatientUnderstandingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" }); // Utilisation du hook useMediaQuery pour déterminer si l'écran est de taille bureau (> 991px)
  const [checkedValues, setCheckedValues] = useState([]); // Utilisation du hook useState pour définir l'état des valeurs cochées des cases à cocher avec une valeur initiale vide
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
        console.error("Statut mis à jour avec succès"); // Affichage d'un message de succès dans la console
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err); // Affichage de l'erreur dans la console en cas d'échec de la requête
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

// Exporte le composant PatientUnderstandingPage par défaut
export default PatientUnderstandingPage;
