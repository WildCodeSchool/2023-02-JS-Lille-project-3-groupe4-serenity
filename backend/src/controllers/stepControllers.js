const models = require("../models");

const browse = (req, res) => {
  models.step
    .findAllStep()
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { idInter, idStep } = req.params;

  models.step
    .findStepById(idInter, idStep)
    .then((rows) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const { statutUnderstep } = req.body;
  const { id } = req.params;

  const understep = {
    id: parseInt(id, 10),
    statutUnderstep,
  };

  if (understep.statutUnderstep === undefined) {
    return res.status(400).send("Missing statutUnderstep");
  }

  return models.step
    .updateUnderStepStatut(understep.id, understep.statutUnderstep)
    .then((result) => {
      if (result[0] === 0) {
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
  const step = req.body;

  // TODO validations (length, format...)

  models.step
    .insert(step)
    .then(([result]) => {
      res.location(`/steps/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.step
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
  edit,
  add,
  destroy,
};
