const models = require("../models");

const browse = (req, res) => {
  models.intervention
    .findAllIntervention()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.intervention
    .find(req.params.id)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const readBySocialSecuNumber = async (req, res) => {
  const { socialSecuNumber } = req.params;

  try {
    const interventions = await models.intervention.findInterventionByUserId(
      socialSecuNumber
    );

    if (interventions.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No interventions found for this social security number.",
      });
    }

    return res.status(200).json({
      status: "success",
      interventions: interventions[0],
    });
  } catch (error) {
    console.error("Error retrieving interventions:", error);

    return res.status(500).json({
      status: "error",
      message: "An error occurred while retrieving interventions.",
    });
  }
};

const select = (req, res) => {
  models.intervention
    .findInterventionByIdentifierRpps(req.params.identifierRpps)
    .then((rows) => {
      if (!rows || rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const count = (req, res) => {
  models.intervention
    .findCountIntervention()
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const intervention = req.body;

  // TODO validations (length, format...)

  intervention.id = parseInt(req.params.id, 10);

  models.intervention
    .update(intervention)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const intervention = req.body;

  // TODO validations (length, format...)

  models.intervention
    .insert(intervention)
    .then((result) => {
      res.location(`/interventions/${result}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.intervention
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  readBySocialSecuNumber,
  select,
  edit,
  add,
  destroy,
  count,
};
