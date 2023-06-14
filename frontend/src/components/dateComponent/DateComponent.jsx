import React from "react";
import styles from "./DateComponent.module.css";

function DateComponent() {
  const currentDate = new Date();
  const month = currentDate.toLocaleString("fr", { month: "long" });
  const weekday = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  const day = weekday[currentDate.getDay() - 1];

  const date = `${day} ${currentDate.getDate()} ${month} ${currentDate.getFullYear()}`;

  return <div className={styles.dateContainer}>{date}</div>;
}

export default DateComponent;
