import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import proLogo from "../assets/professional_logo.svg";
import patientLogo from "../assets/patient_logo.svg";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.headerContainer}>
        <div className={styles.logoContainer}>Serenity</div>
        <div className={styles.rightContainer} />
      </header>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Connexion</h1>
        <p className={styles.text}>Vous êtes:</p>
        <div className={styles.connexionLinksContainer}>
          <div className={styles.proGlobalBloc}>
            <Link to="/admin">
              <div className={styles.professionalContainer}>
                <img src={proLogo} alt="professional logo connexion" />
              </div>
            </Link>

            <p className={styles.logoText}>Professionnel.le de santé</p>
          </div>
          <div className={styles.patientGlobalBloc}>
            <Link to="/patient/intervention">
              <div className={styles.patientContainer}>
                <img
                  className={styles.patientLogoClass}
                  src={patientLogo}
                  alt="patient logo connexion"
                />
              </div>
            </Link>

            <p className={styles.logoText}>Patient.e</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
