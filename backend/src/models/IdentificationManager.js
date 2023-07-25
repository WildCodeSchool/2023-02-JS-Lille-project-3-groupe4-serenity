const AbstractManager = require("./AbstractManager");

class IdentificationManager extends AbstractManager {
  constructor() {
    super({ table: "identification" });
  }

  selectByEmail(email) {
    return this.database.query(
      `SELECT * FROM ${this.table} AS i
    JOIN user AS u ON i.user_id = u.id
    WHERE i.email = ?`,
      [email]
    );
  }
}

module.exports = IdentificationManager;
