// Importation des dépendances nécessaires
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Définition du composant PatientInterventionPage comme une fonction
function PatientInterventionPage() {
  // Utilisation du hook d'état useState pour définir une variable inter et sa fonction de mise à jour setInter
  const [inter, setInter] = useState([]);

  // Utilisation du hook useEffect pour effectuer une requête HTTP GET et récupérer les données des interventions
  useEffect(() => {
    // Fonction asynchrone pour effectuer la requête
    const fetchInter = async () => {
      try {
        // Appel à l'API pour récupérer les données des interventions
        const response = await axios.get("http://localhost:5050/interventions");
        const { data } = response;

        // Supprime les doublons d'interventions en utilisant la méthode reduce
        const uniqueInter = data.reduce((acc, current) => {
          // Vérifie si l'intervention courante existe déjà dans l'accumulateur
          const x = acc.find(
            (item) => item.Nom_Intervention === current.Nom_Intervention
          );
          if (!x) {
            // Si l'intervention n'existe pas encore, l'ajoute à l'accumulateur
            return acc.concat([current]);
          }
          // Si l'intervention existe déjà, retourne l'accumulateur sans modification
          return acc;
        }, []);

        // Met à jour l'état des interventions uniques avec la fonction setInter
        setInter(uniqueInter);
      } catch (error) {
        console.error(error);
      }
    };

    // Appelle la fonction fetchInter pour récupérer les données des interventions lors du montage du composant
    fetchInter();
  }, []);

  useEffect(() => {
    // Fonction asynchrone pour effectuer la requête
    const fetchInter = async () => {
      try {
        // Appel à l'API pour récupérer les données des interventions
        const response = await axios.get("http://localhost:5050/interventions");
        const { data } = response;
        // Supprime les doublons d'interventions en utilisant la méthode reduce
        const uniqueInter = data.reduce((acc, current) => {
          // Vérifie si l'intervention courante existe déjà dans l'accumulateur
          const x = acc.find(
            (item) => item.nomIntervention === current.nomIntervention
          );
          if (!x) {
            // Si l'intervention n'existe pas encore, l'ajoute à l'accumulateur
            return acc.concat([current]);
          }
          // Si l'intervention existe déjà, retourne l'accumulateur sans modification
          return acc;
        }, []);

        // Met à jour l'état des interventions uniques avec la fonction setInter
        setInter(uniqueInter);
      } catch (error) {
        console.error(error);
      }
    };

    // Appelle la fonction fetchInter pour récupérer les données des interventions lors du montage du composant
    fetchInter();
  }, []);

  // Rendu du composant
  return (
    <div>
      {/* Utilise la méthode map pour itérer sur le tableau inter et afficher les liens */}
      {inter.map((item) => (
        <div key={item.id_intervention}>
          {/* Crée un élément Link de React Router avec le lien vers la page PatientUnderstandingPage et l'ID de l'intervention dans l'URL */}
          <Link
            to={`/patient/${item.id_intervention}/understanding/initiation`}
          >
            {item.nomIntervention}
          </Link>
        </div>
      ))}
    </div>
  );
}

// Exporte le composant PatientInterventionPage par défaut
export default PatientInterventionPage;
