const jwt = require("jsonwebtoken");
const models = require("../models");

const browse = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).send({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await models.intervention.findAllUserInterventions(
      decoded.id
    );
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
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
  edit,
  add,
  destroy,
};
