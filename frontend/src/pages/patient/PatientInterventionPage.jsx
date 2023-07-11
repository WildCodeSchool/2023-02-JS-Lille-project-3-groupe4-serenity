import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./PatientInterventionPage.module.css";

function PatientInterventionPage() {
  const [inter, setInter] = useState([]);

  useEffect(() => {
    const fetchInter = async () => {
      try {
        const response = await axios.get("http://localhost:5050/interventions");
        const { data } = response;

        const uniqueInter = data.reduce((acc, current) => {
          const x = acc.find(
            (item) => item.Nom_Intervention === current.Nom_Intervention
          );
          if (!x) {
            return acc.concat([current]);
          }
          return acc;
        }, []);

        setInter(uniqueInter);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInter();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <header className={styles.headerContainer}>
        <div className={styles.logoContainer}>Serenity</div>
        <div className={styles.rightContainer} />
      </header>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Liste d'interventions</h1>
        <p className={styles.text}>
          Je choisis le type d'intervention qui me concerne.
        </p>
        <div className={styles.container}>
          <div className={styles.card}>
            {inter.map((item, index) => (
              <div key={item.ID_Intervention}>
                <Link
                  to={`/patient/${item.ID_Intervention}/understanding/initiation`}
                  className={styles.link}
                >
                  {item.Nom_Intervention}
                </Link>
                {index !== inter.length - 1 && (
                  <div className={styles.separator} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientInterventionPage;
