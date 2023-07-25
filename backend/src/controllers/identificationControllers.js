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
    const [rows] = await models.identification.selectByEmail(email);

    if (rows.length > 0) {
      const match = await bcrypt.compare(password, rows[0].pwd);
      if (match) {
        const {
          social_secu_number: socialSecuNumber,
          identifier_rpps: identifierRpps,
          first_name: firstName,
          last_name: lastName,
          roles: role,
        } = rows[0];
        const token = jwt.sign(
          { socialSecuNumber, identifierRpps, role },
          process.env.JWT_PASSWORD,
          {
            expiresIn: 300,
          }
        );

        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000), // Expires in 1 hour
        });
        res.status(200).json({
          user: {
            socialSecuNumber,
            identifierRpps,
            firstName,
            lastName,
            email: rows[0].email,
            role,
          },
        });
      } else {
        res
          .status(401)
          .json({ error: "Authentication failed. Incorrect password." });
      }
    } else {
      res.status(401).json({ error: "Authentication failed. User not found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const logout = async (req, res) => {
  const { cookies } = req;

  if (!cookies?.token) return res.sendStatus(204); // No content

  res.clearCookie("token", { httpOnly: true });
  return res.sendStatus(204);
};

module.exports = {
  read,
  edit,
  add,
  destroy,
  login,
  logout,
};
