import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./PatientInterventionPage.module.css";

function PatientInterventionPage() {
  const [inter, setInter] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5050/interventions", {
          withCredentials: true, // this tells Axios to send the cookies along with the request
        })
        .then(({ data }) => {
          setInter(data);
        });
    } catch (error) {
      console.error(error);
    }
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
              <div key={item.id_intervention}>
                <Link
                  to={`/patient/1/${item.id_intervention}/understanding`}
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
      </div>
    </div>
  );
}

export default PatientInterventionPage;
