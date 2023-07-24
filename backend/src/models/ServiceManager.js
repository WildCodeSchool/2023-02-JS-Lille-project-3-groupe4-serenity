const AbstractManager = require("./AbstractManager");

class ServiceManager extends AbstractManager {
  constructor() {
    super({ table: "service" });
  }

  async findAllService() {
    const query = `
    SELECT service.nom_service, 
    service.etage, 
    batiment.nom_batiment, COUNT(*) AS "nombre_de_practiciens"
    FROM service
    JOIN batiment ON service.batiment_id = batiment.id
    JOIN practitioner ON service.id = practitioner.service_id
    GROUP BY service.nom_service, service.etage, batiment.nom_batiment;
    `;

    const [rows] = await this.database.query(query);
    return rows;
  }

  find(nameOfService) {
    return this.database.query(
      `SELECT 
          service.nom_service, 
          service.etage, 
          batiment.nom_batiment, 
          COUNT(*) AS "nombre_de_practiciens"
      FROM 
          service
      JOIN 
          batiment ON service.batiment_id = batiment.id
      JOIN 
          practitioner ON service.id = practitioner.service_id
      WHERE 
          service.nom_service = ? 
      GROUP BY 
          service.nom_service, service.etage, batiment.nom_batiment;`,
      [nameOfService]
    );
  }
}
module.exports = ServiceManager;
