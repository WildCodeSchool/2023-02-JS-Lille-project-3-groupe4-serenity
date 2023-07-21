const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models");

const read = (req, res) => {
  models.identification
    .find(req.params.id)
    .then(([rows]) => {
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
  const identification = req.body;

  // TODO validations (length, format...)

  identification.id = parseInt(req.params.id, 10);

  models.identification
    .update(identification)
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
  const identification = req.body;

  // TODO validations (length, format...)

  models.identification
    .insert(identification)
    .then((result) => {
      res.location(`/identification/${result}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.identification
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

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [[identification]] = await models.identification.selectByEmail(email);

    if (!identification) {
      return res.status(400).send({ message: "Invalid email" });
    }

    const match = await bcrypt.compare(password, identification.pwd);

    if (!match) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: identification.user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Expires in 1 hour
      }
    );

    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000), // Expires in 1 hour
    });

    return res.status(200).send({ message: "Logged in successfully", token });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200);
};

module.exports = {
  read,
  edit,
  add,
  destroy,
  login,
  logout,
};
