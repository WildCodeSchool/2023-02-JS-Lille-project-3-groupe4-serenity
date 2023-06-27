const AbstractManager = require("./AbstractManager");

class PatientManager extends AbstractManager {
  constructor() {
    super({ table: "Patient" });
  }

  async insert(patient) {
    await this.database.query(
      `INSERT INTO USER (last_name, first_name, age, gender, phone, nationality, address, city, zip_code, roles, email) VALUES (?,?,?,?,?,?,?,?,?,"Patient",?)`,
      [
        patient.last_name,
        patient.first_name,
        patient.age,
        patient.gender,
        patient.phone,
        patient.nationality,
        patient.address,
        patient.city,
        patient.zip_code,
        patient.email,
      ]
    );

    await this.database.query(`SET @user_id = LAST_INSERT_ID();`);

    await this.database.query(
      `INSERT INTO Patient (social_secu_number, blood_group, allergy, remark, user_id) VALUES (?, ?, ?, ?, @user_id)`,
      [
        patient.social_secu_number,
        patient.blood_group,
        patient.allergy,
        patient.remark,
      ]
    );
    await this.database.query(
      `INSERT INTO Identification (pwd, roles, email, user_id, social_secu_number, staff_id) 
       VALUES ('password123', 'Patient',
        (SELECT email FROM serenity.User AS U WHERE U.id = @user_id),
        @user_id,
        (SELECT social_secu_number FROM serenity.Patient P WHERE P.user_id = @user_id),
        2)`
    );
  }

  async findAllPatient() {
    const query = `
      SELECT user.last_name AS "nom", user.first_name AS "prenom",
      user.age,
      patient.social_secu_number AS "social_number",
      patient.user_id AS "id"
      FROM user
      JOIN patient ON user.id = patient.user_id
    `;

    const [rows] = await this.database.query(query);
    return rows;
  }

  async findPatientBySocialSecuNumber(socialSecuNumber) {
    const query = `
      SELECT u.gender AS "Sexe", u.last_name AS "Nom", u.first_name AS "Prénom", u.age,
      u.phone AS "Téléphone", u.nationality AS "Nationalité", u.address AS "Adresse", u.city AS "Ville",
      u.zip_code AS "Code_Postal", u.email AS "Email",
      i.pwd AS "Mot_de_Passe",
      pt.blood_group AS "Groupe_Sanguin",
      pt.allergy AS "Allergie",
      pt.remark AS "Remarques",
      pt.social_secu_number AS "Numéro_de_sécurité_Sociale"
      FROM serenity.User u
      JOIN serenity.Identification i ON u.id = i.user_id
      JOIN serenity.Patient pt ON u.id = pt.user_id
      WHERE pt.social_secu_number = ?
    `;

    const [rows] = await this.database.query(query, [socialSecuNumber]);
    return rows;
  }
}

module.exports = PatientManager;
