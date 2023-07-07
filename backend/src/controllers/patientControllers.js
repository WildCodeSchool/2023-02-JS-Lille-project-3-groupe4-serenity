const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const models = require("../models");

const browse = (req, res) => {
  models.patient
    .findAllPatient()
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.patient
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
  const patient = req.body;

  // TODO validations (length, format...)

  patient.id = parseInt(req.params.id, 10);

  models.patient
    .update(patient)
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
  const patient = req.body;

  // Generate a random password
  const password = crypto.randomBytes(10).toString("hex");

  // Hash and salt the password using bcrypt
  bcrypt.hash(password, 10, async (hashError, hashedPassword) => {
    if (hashError) {
      console.error(hashError);
      res.sendStatus(500);
      return;
    }

    // Add the hashed password to the patient object
    patient.password = hashedPassword;

    // TODO validations (length, format...)

    try {
      const result = await models.patient.insert(patient, hashedPassword);

      // Create a transporter
      const transporter = nodemailer.createTransport({
        service: "gmail", // use your email service
        auth: {
          user: process.env.MAIL, // your email
          pass: process.env.MAIL_PWD, // your email password
        },
      });

      // Set up email data
      const mailOptions = {
        from: process.env.MAIL, // sender address
        to: patient.email, // list of receivers
        subject: "Your new account", // Subject line
        text: `Welcome! Your password is ${password}`, // plain text body
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.location(`/patients/${result}`).sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
};

const destroy = (req, res) => {
  models.patient
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
