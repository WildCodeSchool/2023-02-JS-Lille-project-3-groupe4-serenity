const models = require("../models");

const browse = (req, res) => {
  models.resource
    .findAllResources()
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const findByTypeIntervention = (req, res) => {
  const { typeIntervention } = req.params;

  models.resource
    .findResourcesByTypeIntervention(typeIntervention)
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const resource = req.body;

  resource.id = parseInt(req.params.id, 10);

  models.resource
    .update(resource)
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
  const resource = req.body;

  models.resource
    .insert(resource)
    .then((result) => {
      res.location(`/resources/${result}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.resource
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
  findByTypeIntervention,
  edit,
  add,
  destroy,
};
