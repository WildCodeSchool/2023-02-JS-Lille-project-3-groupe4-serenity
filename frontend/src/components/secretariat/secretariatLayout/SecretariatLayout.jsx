import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./SecretariatLayout.module.css";
import SecretariatNavbar from "../secretariatNavbar/SecretariatNavbar";
import SecretariatHeader from "../secretariatHeader/SecretariatHeader";

function SecretariatLayout() {
  return (
    <div className={styles.layoutContainer}>
      <SecretariatNavbar />
      <div className={styles.headerAndPageContainer}>
        <SecretariatHeader />
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SecretariatLayout;
