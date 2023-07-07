const AbstractManager = require("./AbstractManager");

class PractitionerManager extends AbstractManager {
  constructor() {
    super({ table: "Practitioner" });
  }

  async insert(practitioner) {
    await this.database.query(
      `INSERT INTO user (last_name, first_name, age, gender, phone, nationality, address, city, zip_code, roles, email) VALUES (?,?,?,?,?,?,?,?,?,"Practitioner",?)`,
      [
        practitioner.last_name,
        practitioner.first_name,
        practitioner.age,
        practitioner.gender,
        practitioner.phone,
        practitioner.nationality,
        practitioner.address,
        practitioner.city,
        practitioner.zip_code,
        practitioner.email,
      ]
    );

    await this.database.query(`SET @user_id = LAST_INSERT_ID();`);

    await this.database.query(
      `INSERT INTO practitioner (identifier_rpps, speciality, longitude, latitude, type_intervention, user_id,
        service_id) VALUES (?, ?, ?, ?, ?, @user_id, (SELECT id FROM serenity.service AS S WHERE S.nom_service = ?))`,
      [
        practitioner.identifier_rpps,
        practitioner.speciality,
        practitioner.longitude,
        practitioner.latitude,
        practitioner.type_intervention,
        practitioner.nom_service,
      ]
    );
    await this.database.query(
      `INSERT INTO identification (pwd, roles, email, user_id, identifier_rpps, staff_id)
       SELECT 'Smith123', 'Practitioner', 
       (SELECT email FROM serenity.user AS U WHERE U.id = @user_id), 
       @user_id, 
       (SELECT identifier_rpps FROM serenity.practitioner P WHERE P.user_id = @user_id),
       2`
    );
  }

  async findAllPractitioner() {
    const query = `
    SELECT user.last_name AS "nom", user.first_name AS "prenom",
    practitioner.speciality,
    practitioner.identifier_rpps as "identifiantrpps"
    FROM practitioner
    JOIN user ON practitioner.user_id = user.id
    `;

    const [rows] = await this.database.query(query);
    return rows;
  }
}

module.exports = PractitionerManager;
