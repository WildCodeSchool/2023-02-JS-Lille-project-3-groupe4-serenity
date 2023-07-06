import ProgressBar from "@ramonak/react-progress-bar";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./OutboardingMobile.module.css";

function OutboardingMobile() {
  const [selectedOption, setSelectedOption] = useState("");
  const [practitioners, setPractitioners] = useState([]);

  useEffect(() => {
    const fectchAllPractitionner = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/practitioners`
        );
        setPractitioners(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fectchAllPractitionner();
  }, []);

  // Filter the practitioners based on the selected option
  const filteredPractitioners = practitioners.filter(
    (practitioner) => practitioner.speciality === selectedOption
  );

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className={styles.outboardingMobileContainer}>
      <div className={styles.progressBarContainer}>
        <p className={styles.blocTitle}>Anticiper ma sortie</p>
        <ProgressBar
          completed={60}
          maxCompleted={100}
          height="8vh"
          borderRadius="20px"
          baseBgColor="var(--green)"
          bgColor="var(--light-green)"
          labelClassName={styles.textProgressBar}
        />
      </div>
      <div className={styles.appointmentBloc}>
        <h1 className={styles.startText}>
          Afin de sécuriser votre retour à la maison votre chirurigien vous
          invite à prendre rendez-vous avec les professionnels de santé suivant
          :
        </h1>
      </div>
      <div>
        <select
          value={selectedOption}
          onChange={handleChange}
          className={styles.menuList}
        >
          <option value="">Sélectionnez un professionnel</option>
          <option value="Cardiologie">Cardiologie</option>
          <option value="Orthopédie">Orthopédie</option>
        </select>
      </div>
      <div className={styles.mapContainer}>
        <MapContainer
          style={{ width: "100%", height: "100%" }}
          center={[48.8566, 2.3522]}
          zoom={1}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredPractitioners.map((practitioner) => (
            <Marker
              key={practitioner.identifier_rpps}
              position={[practitioner.latitude, practitioner.longitude]}
            >
              <Popup>
                <div className={styles.practitionerName}>
                  {practitioner.first_name} {practitioner.last_name}
                </div>
                <div className={styles.practitionerInfos}>
                  {practitioner.address}
                  <br /> {practitioner.zip_code} {practitioner.city}
                  <br /> {practitioner.phone}
                  <br /> {practitioner.email}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default OutboardingMobile;
