import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./SecretariatLoginPage.module.css";

function SecretariatLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/secretariatLogin`,
        {
          email,
          password,
        }
      );
      if (response.status === 200) {
        // Store the token in a cookie
        document.cookie = `token=${response.data.token}; path=/;`;

        navigate("/secretariat");
      } else {
        console.error("Connexion non autorisée");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      togglePasswordVisibility();
    }
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.headerContainer}>
        <div className={styles.logoContainer}>Serenity</div>
        <div className={styles.rightContainer} />
      </header>
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Connexion</h1>
        <p className={styles.text}>
          Je suis secrétaire, je me connecte à mon espace personnel à l'aide de
          mes identifiants Serenity reçus par mail.
        </p>
        <div className={styles.formContainer}>
          <label className={styles.emailLabel}>
            E-mail
            <input
              className={styles.emailField}
              type="email"
              name="email"
              placeholder="Saisissez votre adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.passwordLabel}>
            Mot de passe
            <div className={styles.passwordInputContainer}>
              <input
                className={styles.passwordField}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Saisissez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className={styles.passwordVisibilityIcon}
                onClick={togglePasswordVisibility}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </label>
          <input
            className={styles.submitButton}
            type="submit"
            value="Me connecter"
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default SecretariatLoginPage;
