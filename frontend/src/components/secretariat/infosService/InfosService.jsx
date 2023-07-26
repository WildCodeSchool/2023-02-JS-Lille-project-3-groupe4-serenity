import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styles from "./InfosService.module.css";

function InfosService() {
  const nameOfService = useParams().nom_service;
  const [service, setService] = useState({});

  useEffect(() => {
    const fetchServiceById = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/service/infos/${nameOfService}`
        );
        setService(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServiceById();
  }, [nameOfService]);

  return (
    <div className={styles.infoServiceContainer}>
      <div className={styles.closeButtonContainer}>
        <Link to="/secretariat/service">
          <FaRegWindowClose className={styles.closeIcon} />
        </Link>
      </div>
      <div className={styles.titleInfoServiceContainer}>
        Information du Service
      </div>
      {Object.keys(service).length > 0 && (
        <>
          <div className={styles.NameAndNumberPracticionerContainer}>
            <div className={styles.nameOfServiceContainer}>
              <label>
                Nom du service:
                <input
                  type="text"
                  name="nom_service"
                  value={service.nom_service}
                  disabled
                />
              </label>
            </div>
            <div className={styles.numberOfPracticionerContainer}>
              <label>
                Nombre de praticiens:
                <input
                  type="text"
                  name="nombre_de_practiciens"
                  value={service.nombre_de_practiciens}
                  disabled
                />
              </label>
            </div>
          </div>
          <div className={styles.etageAndBatimentContainer}>
            <div className={styles.batimentInfoServiceContainer}>
              <label>
                Bâtiment:
                <input
                  type="text"
                  name="nom_batiment"
                  value={service.nom_batiment}
                  disabled
                />
              </label>
            </div>
            <div className={styles.etageInfosServiceContainer}>
              <label>
                Étage:
                <input
                  type="text"
                  name="etage"
                  value={service.etage}
                  disabled
                />
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InfosService;
