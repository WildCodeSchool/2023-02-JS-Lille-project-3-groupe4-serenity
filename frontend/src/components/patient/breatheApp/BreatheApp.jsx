import React, { useState, useRef, useEffect } from "react";
import "./BreatheApp.css";

function App() {
  const [breathsLeft, setBreathsLeft] = useState(3);
  const intervalRef = useRef(null);
  const instructionsRef = useRef(null);
  const circleProgressRef = useRef(null);
  const startButtonRef = useRef(null);

  const handleBreathChange = (event) => {
    setBreathsLeft(Number(event.target.value));
  };

  const growCircle = () => {
    circleProgressRef.current.classList.add("circle-grow");
    setTimeout(() => {
      circleProgressRef.current.classList.remove("circle-grow");
    }, 4000); // Ajustez le délai ici en fonction de la durée d'une respiration
  };

  const breathTextUpdate = () => {
    setBreathsLeft((prevBreathsLeft) => prevBreathsLeft - 1);
  };

  const breathingApp = () => {
    intervalRef.current = setInterval(() => {
      if (breathsLeft <= 0) {
        clearInterval(intervalRef.current);
        instructionsRef.current.innerText =
          "Breathing session completed. Click 'Begin' to start another session!";
        startButtonRef.current.disabled = false;
        return;
      }

      growCircle();
      breathTextUpdate();
    }, 12000);
  };

  const startBreathing = () => {
    startButtonRef.current.disabled = true;
    instructionsRef.current.innerText = "Préparez vous, l'exercice va débuter.";
    setTimeout(() => {
      instructionsRef.current.innerText = "Relaxez vous...";
      setTimeout(() => {
        breathingApp();
        growCircle();
        breathTextUpdate();
      }, 2000);
    }, 2000);
  };

  const resetApp = () => {
    setBreathsLeft(3);
    instructionsRef.current.innerText =
      "Êtes vous prêt à démarrer votre respiration ?";
    startButtonRef.current.disabled = false;
  };

  useEffect(() => {
    if (breathsLeft <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [breathsLeft]);

  return (
    <div className="BreatheApp">
      <div className="input">
        <p className="breaths">Nombre de respirations</p>
        <select className="breath-input" onChange={handleBreathChange}>
          <option value="3">3 Respirations</option>
          <option value="5">5 Respirations</option>
          <option value="7">7 Respirations</option>
        </select>
      </div>
      <div className="circle-wrap">
        <div className="circle-outline" />
        <div className="circle-progress" ref={circleProgressRef} />
      </div>
      <p className="breaths">
        Respirations restantes:{" "}
        <span className="breaths-text">{breathsLeft}</span>
      </p>
      <p className="instructions" ref={instructionsRef}>
        Êtes vous prêt à démarrer ?
      </p>
      {breathsLeft <= 0 && (
        <button className="start" type="button" onClick={resetApp}>
          Recommencer
        </button>
      )}
      {breathsLeft > 0 && (
        <button
          className="start"
          type="button"
          onClick={startBreathing}
          ref={startButtonRef}
        >
          Démarrer
        </button>
      )}
    </div>
  );
}

export default App;
