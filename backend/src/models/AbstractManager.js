class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id) {
    return this.database.query(
      `SELECT
        intervention.type_intervention,
        intervention.nom_Intervention,
        patient.social_secu_number,
        patient_user.last_name AS "patient_last_name",
        patient_user.first_name AS "patient_first_name",
        practitioner.identifier_rpps,
        practitioner_user.last_name AS "practitioner_last_name",
        practitioner_user.first_name AS "practitioner_first_name",
        intervention.procedure_date,
        understep.step_id,
        step.nom_step AS "Nom_de_l'étape",
        understep.statut AS "understepStatut",
        understep.type_intervention AS "Type_d'intervention_de_la_sous-étape",
        understep.id 
      FROM
        ${this.table} AS intervention
      JOIN serenity.patient AS patient ON intervention.social_secu_number = patient.social_secu_number
      JOIN serenity.practitioner AS practitioner ON intervention.identifier_rpps = practitioner.identifier_rpps
      JOIN serenity.user AS practitioner_user ON practitioner.user_id = practitioner_user.id
      JOIN serenity.user AS patient_user ON patient.user_id = patient_user.id
      JOIN serenity.step AS step ON intervention.id = step.intervention_id
      JOIN serenity.understep AS understep ON step.id = understep.step_id
      WHERE
        intervention.id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = AbstractManager;
