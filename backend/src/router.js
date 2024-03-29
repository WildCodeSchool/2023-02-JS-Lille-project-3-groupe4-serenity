const express = require("express");

const router = express.Router();

const verifyJWT = require("./services/verifyJWT");

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const patientControllers = require("./controllers/patientControllers");

router.get("/patients", patientControllers.browse);
router.get("/patients/count", patientControllers.count);
router.get("/patients/:social_secu_number", patientControllers.read);
router.put("/patients/:id", patientControllers.edit);
router.post("/patients", patientControllers.add);
router.delete("/patients/:id", patientControllers.destroy);

const staffControllers = require("./controllers/staffControllers");

router.get("/admin/staff", staffControllers.browse);
router.get("/admin/staff/:id", staffControllers.read);
router.post("/admin/staff", staffControllers.add);

const identificationControllers = require("./controllers/identificationControllers");

router.post("/login", identificationControllers.login);
router.post("/logout", identificationControllers.logout);

const practitionerControllers = require("./controllers/practitionerControllers");

router.get("/practitioners", practitionerControllers.browse);
router.get("/practitioners/count", practitionerControllers.count);
router.get("/practitioners/:identifier_rpps", practitionerControllers.read);
router.put("/practitioners/:id", practitionerControllers.edit);
router.post("/practitioners", practitionerControllers.add);
router.delete("/practitioners/:id", practitionerControllers.destroy);

const interventionControllers = require("./controllers/interventionControllers");

router.get("/interventions", interventionControllers.browse);
router.get("/interventions/count", interventionControllers.count);
router.get("/interventions/:id", interventionControllers.read);
router.get(
  "/interventions/social_secu_number/:socialSecuNumber",
  verifyJWT,
  interventionControllers.readBySocialSecuNumber
);
router.get(
  "/interventions/patients/:identifierRpps",
  interventionControllers.select
);
router.get(
  "/interventions/practitioner/:identifierRpps",
  interventionControllers.select
);
router.put("/interventions/:id", interventionControllers.edit);
router.post("/interventions", interventionControllers.add);
router.delete("/interventions/:id", interventionControllers.destroy);

const stepControllers = require("./controllers/stepControllers");

router.get("/steps", stepControllers.browse);
router.get("/steps/:idInter/:idStep", stepControllers.read);
router.put("/steps/:id", stepControllers.edit);
router.post("/steps", stepControllers.add);
router.delete("/steps/:id", stepControllers.destroy);

const resourceControllers = require("./controllers/resourceController");

router.get("/resources", resourceControllers.browse);
router.get("/resources/:id", resourceControllers.read);
router.get(
  "/resources/type/:typeIntervention",
  resourceControllers.findByTypeIntervention
);

const serviceControllers = require("./controllers/serviceControllers");

router.get("/service", serviceControllers.browse);

module.exports = router;
