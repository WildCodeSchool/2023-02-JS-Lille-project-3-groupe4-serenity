const AbstractManager = require("./AbstractManager");

class PatientManager extends AbstractManager {
  constructor() {
    super({ table: "patient" });
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
      `INSERT INTO identification (pwd, roles, email, user_id, social_secu_number) 
       VALUES (?, 'Patient',
        (SELECT email FROM serenity.user AS U WHERE U.id = @user_id),
        @user_id,
        (SELECT social_secu_number FROM serenity.patient P WHERE P.user_id = @user_id)
        )`,
      [hashedPassword]
    );
  }

  async findAllPatient() {
    const query = `
      SELECT user.last_name, user.first_name,
      user.age,
      patient.social_secu_number,
      patient.user_id
      FROM user
      JOIN patient ON user.id = patient.user_id
    `;

    const [rows] = await this.database.query(query);
    return rows;
  }

  async findCountPatient() {
    const query = `
   SELECT COUNT(*) FROM patient;
    `;
    const [rows] = await this.database.query(query);
    return rows;
  }

  async findPatientBySocialSecuNumber(socialSecuNumber) {
    const query = `
      SELECT u.gender, u.last_name, u.first_name ,u.age,
      u.phone, u.nationality, u.address, u.city,
      u.zip_code, u.email,
      i.pwd,
      pt.blood_group,
      pt.allergy,
      pt.remark,
      pt.social_secu_number
      FROM serenity.user u
      JOIN serenity.identification i ON u.id = i.user_id
      JOIN serenity.patient pt ON u.id = pt.user_id
      WHERE pt.social_secu_number = ?
    `;

    const [rows] = await this.database.query(query, [socialSecuNumber]);
    return rows;
  }
}

module.exports = PatientManager;
