import axios from "axios";
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useMediaQuery } from "react-responsive";
import { useParams } from "react-router-dom";
import OutboardingMobile from "../../components/patient/outboardingMobile/OutboardingMobile";
import UnderstepsContext from "../../contexts/UnderstepsContext";
import styles from "./PatientOutboardingPage.module.css";

function PatientOutboardingPage() {
  const isDesktop = useMediaQuery({ query: "(min-width: 991px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 990px)" });
  const [underStepIds, setUnderStepIds] = useState([]);
  const { idInter } = useParams();
  const [selectedOption, setSelectedOption] = useState("");
  const [practitioners, setPractitioners] = useState([]);

  const { countOfOnesUstepFour, setCountOfOnesUstepFour } =
    useContext(UnderstepsContext);

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

  // Effectue une requête HTTP GET pour récupérer les données des étapes
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
  const firstFiveUnderStepIds = underStepIds.slice(10, 11);

  // Fonction appelée lors du clic sur le bouton de mise à jour
  const handleUpdateClick = () => {
    axios
      .put(`http://localhost:5050/steps/${firstFiveUnderStepIds}`, {
        statutUnderstep: 1,
      })
      .then(() => {
        if (countOfOnesUstepFour < 1) {
          setCountOfOnesUstepFour((prevCount) => prevCount + 1); // Increment onesCountUstepOne by 1 if checkbox is checked
        }
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du statut :", err); // Display the error in the console if the request fails
      });
  };

  return (
    <div className={styles.outboardingPageContainer}>
      {isTabletOrMobile && <OutboardingMobile />}
      {isDesktop && (
        <div className={styles.prepContainer}>
          <div className={styles.appointmentBloc}>
            <h1 className={styles.startText}>
              Afin de sécuriser votre retour à la maison votre chirurgien vous
              invite à prendre rendez-vous avec les professionnels de santé
              suivant :
            </h1>
          </div>
          <div className={styles.mapAndListContainer}>
            <div className={styles.listContainer}>
              <select
                value={selectedOption}
                onChange={handleChange}
                className={styles.menuList}
              >
                <option value="">Sélectionnez un professionnel</option>
                <option value="Cardiologie">Cardiologie</option>
                <option value="Orthopédie">Orthopédie</option>
              </select>
              <h3 className={styles.confirmationText}>
                Veuillez confirmer une fois votre RDV pris.
              </h3>
              {countOfOnesUstepFour === 0 ? (
                <button
                  type="button"
                  onClick={handleUpdateClick}
                  className={styles.confirmButton}
                >
                  Confirmer
                </button>
              ) : (
                <button type="button" className={`${styles.confirmedButton} $`}>
                  Terminé
                </button>
              )}
            </div>
            <div className={styles.mapContainer}>
              <MapContainer
                style={{ width: "100%", height: "100%" }}
                center={[50.62933770693853, 3.0571972430917853]}
                zoom={10}
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
        </div>
      )}
    </div>
  );
}

export default PatientOutboardingPage;
