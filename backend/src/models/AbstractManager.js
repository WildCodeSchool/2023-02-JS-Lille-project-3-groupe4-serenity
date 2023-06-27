class AbstractManager {
  constructor({ table }) {
    this.table = table;
  }

  find(id) {
    return this.database.query(
      ` SELECT
    intervention.type_intervention AS "Type_d'intervention",
    intervention.nom_Intervention AS "Nom_de_l'intervention",
    patient.social_secu_number AS "Numéro_de_sécurité_sociale_du_patient",
    patient_user.last_name AS "Nom_du_patient", patient_user.first_name AS "Prenom_du_patient",
    practitioner.identifier_rpps AS "Identifiant_RPPS_du_praticien",
    practitioner_user.last_name AS "Nom_du_Practicien", practitioner_user.first_name AS "Prénom_du_praticien",
    intervention.procedure_date AS "Date_de_l'intervention"
  FROM
   ${this.table} AS intervention
    JOIN serenity.Patient AS patient ON intervention.social_secu_number = patient.social_secu_number
    JOIN serenity.Practitioner AS practitioner ON intervention.identifier_rpps = practitioner.identifier_rpps
    JOIN serenity.User AS practitioner_user ON practitioner.user_id = practitioner_user.id
    JOIN serenity.User AS patient_user ON patient.user_id = patient_user.id
  WHERE
    intervention.id = ?;`,
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
