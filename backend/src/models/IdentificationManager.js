const AbstractManager = require("./AbstractManager");

class IdentificationManager extends AbstractManager {
  constructor() {
    super({ table: "identification" });
  }

  selectByEmail(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ]);
  }
}

module.exports = IdentificationManager;
