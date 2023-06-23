const AbstractManager = require("./AbstractManager");

class PractitionerManager extends AbstractManager {
  constructor() {
    super({ table: "User" });
  }

  async insert(practitioner) {
    await this.database.query(
      `INSERT INTO USER (last_name, first_name, age, gender, phone, nationality, address, city, zip_code, roles, email) VALUES (?,?,?,?,?,?,?,?,?,"Practitioner",?)`,
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
      `INSERT INTO Practitioner (identifier_rpps, speciality, longitude, latitude, type_intervention, user_id,
        service_id) VALUES (?, ?, ?, ?, ?, @user_id, (SELECT id FROM serenity.Service AS S WHERE S.nom_service = ?))`,
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
      `INSERT INTO Identification (pwd, roles, email, user_id, identifier_rpps, staff_id)
       SELECT 'Smith123', 'Practitioner', 
       (SELECT email FROM serenity.User AS U WHERE U.id = @user_id), 
       @user_id, 
       (SELECT identifier_rpps FROM serenity.Practitioner P WHERE P.user_id = @user_id),
       2`
    );
  }

  findAllPractitioner() {
    return this.database.query(
      `SELECT CONCAT(User.last_name, ' ', User.first_name) AS "Nom du praticien",
      Practitioner.identifier_rpps as "identifiant RPPS",
      User.email
      FROM Practitioner
      JOIN User ON Practitioner.user_id = User.id`
    );
  }
}

module.exports = PractitionerManager;
