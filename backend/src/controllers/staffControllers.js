const crypto = require("crypto");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();
const models = require("../models");

const browse = (req, res) => {
  models.staff
    .findAllStaff()
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.staff
    .findStaffById(req.params.id)
    .then((rows) => {
      if (rows.length === 0) {
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

const add = (req, res) => {
  const staff = req.body;

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
    staff.password = hashedPassword;

    try {
      const result = await models.staff.insert(staff, hashedPassword);

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
        to: staff.email, // list of receivers
        subject: "Your new account", // Subject line
        text: `Welcome! Your password is ${password}`, // plain text body
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.location(`/staff/${result}`).sendStatus(201);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
};

module.exports = {
  browse,
  read,
  add,
};
