const express = require("express");
const app = express();
const patientsRouter = express.Router();
const bodyParser = require("body-parser");

let listOfPatients = ["Kwame", "Bougie", "Abaabawa", "Djonboi"]; // CALL TO DB

app.use("/patients", patientsRouter);
app.use(bodyParser.json());

patientsRouter.param("id", (req, res, next, name) => {
  try {
    if (listOfPatients[name]) {
      req.patient = listOfPatients[name];
      res.status(200).send(req.patient);
      next();
    } else {
      throw Error("This patient is not in the records");
    }
  } catch (error) {
    next(error);
  }
});

// GET ALL PATIENTS
patientsRouter.get("/", (req, res, next) => {
  res.send(listOfPatients);
});

// GET UNIQUE PATIENT
patientsRouter.get("/:id", (req, res, next) => {
  res.send(listOfPatients[req.patient]);
});

// CREATE NEW PATIENT
patientsRouter.post("/newpatient", (req, res, next) => {
  const create = req.query.name;
  if (create !== undefined) {
    listOfPatients.push(create);
    res.status(201).send(create);
  } else {
    res.status(400).send("Error creating new patient");
  }
});

// UPDATE PATIENT PROFILE
patientsRouter.put("/:id", (req, res, next) => {
  const patientUpdate = req.query.name;
  if (patientUpdate !== undefined) {
    listOfPatients[req.patient] = patientUpdate;
    res.status(201).send(listOfPatients[req.patient]);
  } else {
    res.status(400).send("Error updating patient record");
  }
});

// DELETE PATIENT PROFILE
patientsRouter.delete("/:id", (req, res, next) => {
  listOfPatients.splice(req.patient, 1);
  res.status(204).send("Patient deleted");
});

// ERROR HANDLER
const errorHandler = (err, req, res, next) => {
  let errorStatus = err.status;
  if (!errorStatus) {
    errorStatus = 500;
  }
  res.status(errorStatus).send(err.message);
};
app.use(errorHandler);

module.exports = patientsRouter;
