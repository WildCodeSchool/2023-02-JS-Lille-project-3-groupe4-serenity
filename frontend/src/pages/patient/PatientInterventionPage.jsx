import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import styles from "./PatientInterventionPage.module.css";

function PatientInterventionPage() {
  const [inter, setInter] = useState([]);
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const { idPatient } = useParams();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchInter = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/interventions/social_secu_number/${idPatient}`
        );
        setInter(response.data.interventions);
        setIsUnauthorized(false); // Reset the unauthorized state if the call succeeds
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsUnauthorized(true); // Set the state to true if the response is unauthorized
        } else {
          console.error(error);
        }
      }
    };

    fetchInter();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <header className={styles.headerContainer}>
        <div className={styles.logoContainer} />
      </header>
      <div className={styles.pageContainer}>
        {isUnauthorized ? ( // Check if the response is unauthorized
          <div>
            <h1 className={styles.pageTitle}>Accès non autorisé</h1>
            <p className={styles.text}>
              Vous n'êtes pas autorisé à accéder à cette page.
            </p>
          </div>
        ) : (
          <>
            <h1 className={styles.pageTitle}>Liste d'interventions</h1>
            <p className={styles.text}>Je choisis mon intervention.</p>
            <div className={styles.container}>
              <div className={styles.card}>
                {inter.map((item, index) => (
                  <div key={item.id_intervention}>
                    <Link
                      to={`/patient/${idPatient}/${item.id_intervention}/understanding`}
                      className={styles.link}
                    >
                      {item.nomIntervention}
                    </Link>
                    {index !== inter.length - 1 && (
                      <div className={styles.separator} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PatientInterventionPage;
