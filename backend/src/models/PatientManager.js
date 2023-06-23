const AbstractManager = require("./AbstractManager");

class PatientManager extends AbstractManager {
  constructor() {
    super({ table: "User" });
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
}

module.exports = PatientManager;
