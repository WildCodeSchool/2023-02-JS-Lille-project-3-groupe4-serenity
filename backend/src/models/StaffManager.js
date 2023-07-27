const AbstractManager = require("./AbstractManager");

class StaffManager extends AbstractManager {
  constructor() {
    super({ table: "staff" });
  }

  async insert(staff, hashedPassword) {
    // Insert the staff record
    await this.database.query(
      `INSERT INTO user (last_name, first_name, age, gender, phone, nationality, address, city, zip_code, roles, email) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        staff.lastName,
        staff.firstName,
        staff.age,
        staff.gender,
        staff.phone,
        staff.nationality,
        staff.address,
        staff.city,
        staff.zipCode,
        staff.role,
        staff.email,
      ]
    );

    // Get the last inserted user id
    const [userResult] = await this.database.query(
      `SELECT LAST_INSERT_ID() as user_id`
    );
    const userId = userResult[0].user_id;

    // Get the staff_role_id from the staff table based on staff.roles
    const [roleResult] = await this.database.query(
      `SELECT id FROM staff WHERE roles = ? LIMIT 1`,
      [staff.role]
    );

    const staffRoleId = roleResult.length > 0 ? roleResult[0].id : null;

    // Insert the identification record with the staff_role_id
    await this.database.query(
      `INSERT INTO identification (pwd, roles, email, user_id, social_secu_number, staff_id) 
         VALUES (?, 'Staff',
          (SELECT email FROM user AS U WHERE U.id = ?),
          ?,
          (SELECT social_secu_number FROM patient P WHERE P.user_id = ?),
          ?)`,
      [hashedPassword, userId, userId, userId, staffRoleId]
    );
  }

  async findAllStaff() {
    const query = `SELECT user.id, user.last_name, user.first_name, user.roles, user.email 
    FROM user
    JOIN staff ON user.id = staff.id
    JOIN identification ON user.id = identification.id`;

    const [rows] = await this.database.query(query);
    return rows;
  }

  async findStaffById(id) {
    const query = `SELECT user.id, user.last_name, user.first_name, user.gender, 
    user.nationality, user.age, user.address, user.zip_code, user.city, 
    user.phone, user.roles, user.email 
    FROM user
    JOIN staff ON user.id = staff.id
    JOIN identification ON user.id = identification.id
    WHERE user.id = ?`;

    const [rows] = await this.database.query(query, [id]);
    return rows;
  }
}

module.exports = StaffManager;
