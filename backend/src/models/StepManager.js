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
        understep.statut AS "statutUnderstep"
      FROM
        serenity.Intervention AS intervention
        JOIN serenity.Step AS step ON intervention.id = step.intervention_id
        JOIN serenity.Understep AS understep ON step.id = understep.step_id;
    `;

    const [rows] = await this.database.query(query);
    return rows;
  }

  async findStepById(idInter, idStep) {
    const query = `
    SELECT
    intervention.id AS ID_Intervention,
    intervention.nom_Intervention AS Nom_Intervention,
    step.id AS ID_Step,
    step.nom_step AS Nom_Step,
    understep.id AS ID_Understep,
    understep.statut AS statutUnderstep
  FROM
    serenity.Intervention AS intervention
    JOIN serenity.Step AS step ON intervention.id = step.intervention_id
    JOIN serenity.UnderStep AS understep ON step.id = understep.step_id
  WHERE
    intervention.id = ?
    AND step.id = ?;
    `;

    const rows = await this.database.query(query, [idInter, idStep]);
    return rows;
  }

  async updateUnderStepStatut(understepId, statutUnderstep) {
    const query = `
      UPDATE serenity.UnderStep AS us
      SET us.statut = ?
      WHERE us.id = ?;
    `;

    return this.database.query(query, [statutUnderstep, understepId]);
  }
}

module.exports = StepManager;
