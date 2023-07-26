const AbstractManager = require("./AbstractManager");

class ResourcesManager extends AbstractManager {
  constructor() {
    super({ table: "resources" });
  }

  async insert(resource) {
    await this.database.query(
      `INSERT INTO resources (title_resource, type_resource, link, staff_id, type_intervention)
    VALUES ("?", "?", "?",
    "?", "?");`,
      [
        resource.title_resource,
        resource.type_resource,
        resource.link,
        resource.staff_id,
        resource.type_intervention,
      ]
    );
  }

  async findAllResources() {
    const query = `SELECT * FROM resources `;

    const [rows] = await this.database.query(query);
    return rows;
  }

  async findResourceById(id) {
    const query = `SELECT * FROM resources WHERE resources.id = ?`;

    const [rows] = await this.database.query(query, [id]);
    return rows;
  }

  async findResourcesByTypeIntervention(typeIntervention) {
    const query = `SELECT * FROM resources WHERE type_intervention = ?`;
    const [rows] = await this.database.query(query, [typeIntervention]);
    return rows;
  }
}

module.exports = ResourcesManager;
