require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

const ItemManager = require("./ItemManager");

models.item = new ItemManager();
models.item.setDatabase(pool);

const PatientManager = require("./PatientManager");

models.patient = new PatientManager();
models.patient.setDatabase(pool);

const PractitionerManager = require("./PractitionerManager");

models.practitioner = new PractitionerManager();
models.practitioner.setDatabase(pool);

const InterventionManager = require("./InterventionManager");

models.intervention = new InterventionManager();
models.intervention.setDatabase(pool);

const StepManager = require("./StepManager");

models.step = new StepManager();
models.step.setDatabase(pool);

const IdentificationManager = require("./IdentificationManager");

models.identification = new IdentificationManager();
models.identification.setDatabase(pool);

const ResourceManager = require("./ResourceManager");

models.resource = new ResourceManager();
models.resource.setDatabase(pool);

const ServiceManager = require("./ServiceManager");

models.service = new ServiceManager();
models.service.setDatabase(pool);

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
