const AbstractManager = require("./AbstractManager");

class InterventionManager extends AbstractManager {
  constructor() {
    super({ table: "intervention" });
  }

  async insert(intervention) {
    await this.database.query(
      `INSERT INTO ${this.table}(social_secu_number, identifier_rpps, procedure_date, pct_progress_total, type_intervention, nom_Intervention, staff_id)
      VALUES (?, ?, ?, 0, ?, ?, 2);`,
      [
        intervention.social_secu_number,
        intervention.identifier_rpps,
        intervention.procedure_date,
        intervention.type_intervention,
        intervention.nom_Intervention,
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
      VALUES (0, @step_id, 'chirurgie'),
             (0, @step_id+1, 'chirurgie'),
             (0, @step_id+2, 'chirurgie'),
             (0, @step_id+3, 'chirurgie'),
             (0, @step_id+4, 'chirurgie')`
    );

    await this.database.query(
      `INSERT INTO serenity.DocumentAdministratif (id_card_link, statu_id_card, mutual_card_link, statut_card_link,
        informed_consent, statut_informed_consent, anesthetic_consultation, statut_anestheic_consultation, covid_test,
        staut_covid_test, credit_card, statut_credit_card, staff_id, intervention_id)
      VALUES ('valeur1', 0, 'valeur2', 0, 'valeur3', 0, 'valeur4', 0, 'valeur5', 0,'valeur6', 0, 2,  @intervention_id)`
    );

    await this.database.query(
      `INSERT INTO serenity.Resources (title_resource, type_resource, link, staff_id, type_intervention)
      VALUES ("Chirurgie cardiologique", 'Video', 'http://example.com/resource1', 2, 'chirurgie')`
    );
  }

  findAllIntervention() {
    return this.database.query(
      `SELECT CONCAT(practitioner_user.first_name, ' ', practitioner_user.last_name) AS "Nom du praticien",
      CONCAT(patient_user.first_name, ' ', patient_user.last_name) AS "Nom du patient",
      intervention.nom_intervention AS "Nom de l'intervention" ,
      intervention.procedure_date AS "Date de l'intervention"
      FROM serenity.Intervention AS intervention
      JOIN serenity.Practitioner AS practitioner ON intervention.identifier_rpps = practitioner.identifier_rpps
      JOIN serenity.User AS practitioner_user ON practitioner.user_id = practitioner_user.id
      JOIN serenity.Patient AS patient ON intervention.social_secu_number = patient.social_secu_number
      JOIN serenity.User AS patient_user ON patient.user_id = patient_user.id`
    );
  }
}

module.exports = InterventionManager;
