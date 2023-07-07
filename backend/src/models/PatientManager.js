const AbstractManager = require("./AbstractManager");

class PatientManager extends AbstractManager {
  constructor() {
    super({ table: "Patient" });
  }

  async insert(patient, hashedPassword) {
    await this.database.query(
      `INSERT INTO user (last_name, first_name, age, gender, phone, nationality, address, city, zip_code, roles, email) VALUES (?,?,?,?,?,?,?,?,?,"Patient",?)`,
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
      `INSERT INTO patient (social_secu_number, blood_group, allergy, remark, user_id) VALUES (?, ?, ?, ?, @user_id)`,
      [
        patient.social_secu_number,
        patient.blood_group,
        patient.allergy,
        patient.remark,
      ]
    );
    await this.database.query(
      `INSERT INTO identification (pwd, roles, email, user_id, social_secu_number, staff_id) 
       VALUES (?, 'Patient',
        (SELECT email FROM serenity.user AS U WHERE U.id = @user_id),
        @user_id,
        (SELECT social_secu_number FROM serenity.patient P WHERE P.user_id = @user_id),
        2)`,
      [hashedPassword]
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
}

module.exports = PatientManager;
