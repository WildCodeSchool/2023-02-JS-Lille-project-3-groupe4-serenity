const AbstractManager = require("./AbstractManager");

class PractitionerManager extends AbstractManager {
  constructor() {
    super({ table: "practitioner" });
  }

  async insert(practitioner, hashedPassword) {
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
      `INSERT INTO identification (pwd, roles, email, user_id, identifier_rpps)
       SELECT ?, 'Practitioner', 
       (SELECT email FROM serenity.user AS U WHERE U.id = @user_id), 
       @user_id, 
       (SELECT identifier_rpps FROM serenity.practitioner P WHERE P.user_id = @user_id)`,
      [hashedPassword]
    );
  }

  async findAllPractitioner() {
    const query = `
    SELECT user.last_name, user.first_name,
  user.phone, user.address,
  user.city, user.zip_code, user.email,
  practitioner.speciality,
  practitioner.identifier_rpps,
  practitioner.longitude,
  practitioner.latitude
  FROM practitioner
  JOIN user ON practitioner.user_id = user.id
  `;

    const [rows] = await this.database.query(query);
    return rows;
  }

  async findCountPractitioner() {
    const query = `
    select count(*) from practitioner;
    `;
    const [rows] = await this.database.query(query);
    return rows;
  }

  async findPatientByIdentifiantRpps(identifiantRpps) {
    const query = `
    SELECT u.gender, u.last_name, u.first_name, u.age,
    u.phone, u.nationality, u.address, u.city,
    u.zip_code, u.email,
    p.speciality, p.service_id,
    p.identifier_rpps,
    i.pwd,
    s.nom_service
  FROM serenity.user u
  JOIN serenity.practitioner p ON u.id = p.user_id
  JOIN serenity.identification i ON u.id = i.user_id
  JOIN serenity.service s ON u.id = p.user_id
  WHERE p.identifier_rpps = ?;
    `;

    const [rows] = await this.database.query(query, [identifiantRpps]);
    return rows;
  }
}

module.exports = PractitionerManager;
