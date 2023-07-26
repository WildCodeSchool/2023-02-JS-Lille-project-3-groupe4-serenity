const AbstractManager = require("./AbstractManager");

class InterventionManager extends AbstractManager {
  constructor() {
    super({ table: "intervention" });
  }

  async insert(intervention) {
    await this.database.query(
      `INSERT INTO ${this.table}(social_secu_number, identifier_rpps, procedure_date, pct_progress_total, type_intervention, nom_intervention, staff_id)
      VALUES (?, ?, ?, 0, ?, ?, 2);`,
      [
        intervention.social_secu_number,
        intervention.identifier_rpps,
        intervention.procedure_date,
        intervention.type_intervention,
        intervention.nom_intervention,
      ]
    );

    await this.database.query(`SET @intervention_id = LAST_INSERT_ID();`);

    await this.database.query(
      `INSERT INTO step (nom_step, pct_progress, intervention_id)
      VALUES ('comprendre mon opération', 0, @intervention_id),
             ('se débarrasser des formalités administratives', 0, @intervention_id),
             ('préparer mon arrivée en toute sérénité', 0, @intervention_id),
             ('préparer ma sortie', 0, @intervention_id),
             ('ma check list', 0, @intervention_id)`
    );

    await this.database.query(`SET @step_id = LAST_INSERT_ID();`);

    await this.database.query(
      `INSERT INTO understep (statut, step_id, type_intervention)
      VALUES (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 1, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 1, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 1, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 1, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 1, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 2, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 2, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 2, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 3, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 4, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 4, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 4, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 4, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id)),
             (0, @step_id + 4, (SELECT type_intervention FROM intervention WHERE intervention.id = @intervention_id))`
    );

    await this.database.query(
      `INSERT INTO serenity.documentadministratif (id_card_link, statu_id_card, mutual_card_link, statut_card_link,
        informed_consent, statut_informed_consent, anesthetic_consultation, statut_anestheic_consultation, covid_test,
        staut_covid_test, credit_card, statut_credit_card, staff_id, intervention_id)
      VALUES ('valeur1', 0, 'valeur2', 0, 'valeur3', 0, 'valeur4', 0, 'valeur5', 0,'valeur6', 0, 2, @intervention_id)`
    );
  }

  findAllIntervention() {
    return this.database.query(
      `SELECT intervention.social_secu_number AS "social_number",
      intervention.identifier_rpps AS "identifier_rpps",
      intervention.type_intervention AS "typeIntervention",
      intervention.nom_intervention AS "nomIntervention",
      intervention.procedure_date AS "dateIntervention",
      intervention.id AS "id_intervention",
      practitioner_user.last_name AS "practitionerLastName",
      practitioner_user.first_name AS "practitionerFirstName",
      patient_user.last_name AS "patientLastName",
      patient_user.first_name AS "patientFirstName"
      FROM serenity.intervention AS intervention
      JOIN serenity.practitioner AS practitioner ON intervention.identifier_rpps = practitioner.identifier_rpps
      JOIN serenity.user AS practitioner_user ON practitioner.user_id = practitioner_user.id
      JOIN serenity.patient AS patient ON intervention.social_secu_number = patient.social_secu_number
      JOIN serenity.user AS patient_user ON patient.user_id = patient_user.id
      ORDER BY intervention.procedure_date ASC;`
    );
  }

  findInterventionByUserId(socialSecuNumber) {
    return this.database.query(
      `SELECT intervention.social_secu_number AS "social_number",
      intervention.identifier_rpps AS "identifier_rpps",
      intervention.type_intervention AS "typeIntervention" ,
      intervention.nom_intervention AS "nomIntervention",
      intervention.procedure_date AS "dateIntervention",
      intervention.id AS "id_intervention"
      FROM serenity.intervention AS intervention
      JOIN serenity.practitioner AS practitioner ON intervention.identifier_rpps = practitioner.identifier_rpps
      JOIN serenity.user AS practitioner_user ON practitioner.user_id = practitioner_user.id
      JOIN serenity.patient AS patient ON intervention.social_secu_number = patient.social_secu_number
      JOIN serenity.user AS patient_user ON patient.user_id = patient_user.id
      WHERE intervention.social_secu_number = ?;`,
      [socialSecuNumber]
    );
  }

  async findCountIntervention() {
    const query = `
  select count(*) from intervention;
  `;
    const [rows] = await this.database.query(query);
    return rows;
  }
}

module.exports = InterventionManager;
