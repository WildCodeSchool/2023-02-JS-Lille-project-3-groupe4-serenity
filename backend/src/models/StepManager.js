const AbstractManager = require("./AbstractManager");

class StepManager extends AbstractManager {
  constructor() {
    super({ table: "step" });
  }

  async findAllStep() {
    const query = `
      SELECT
        intervention.id AS "ID_Intervention",
        intervention.nom_Intervention AS "Nom_Intervention",
        step.id AS "ID_Step",
        step.nom_step AS "Nom_Step",
        understep.id AS "ID_Understep",
        understep.statut AS "Statut_Understep"
      FROM
        serenity.Intervention AS intervention
        JOIN serenity.Step AS step ON intervention.id = step.intervention_id
        JOIN serenity.Understep AS understep ON step.id = understep.step_id;
    `;

    const [rows] = await this.database.query(query);
    return rows;
  }
}

module.exports = StepManager;
