const express = require("express");
const app = express();
const patientsRouter = express.Router();
const bodyParser = require("body-parser");

let listOfPatients = ["Kwame", "Bougie", "Abaabawa", "Djonboi"]; // CALL FROM DB

app.use("/patients", patientsRouter);
app.use(bodyParser.json());
patientsRouter.param("id", (req, res, next, id) => {
  try {
    if (listOfPatients[id]) {
      req.patient = listOfPatients[id];
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
// patientsRouter.post("/newpatient", (req, res, next) => {
//   const update = req.query;
//   if (correct) {
//     animals.push(correct);
//     res.status(201).send(correct);
//   } else {
//     res.status(400).send("Error creating new post");
//   }
// });

// UPDATE PATIENT PROFILE
patientsRouter.put("/:id", (req, res, next) => {
  const patientUpdate = req.query;
  listOfPatients[req.patient] = patientUpdate;
  res.send(listOfPatients[req.patient]);
});

// DELETE PATIENT PROFILE
patientsRouter.delete("/:id", (req, res, next) => {
  listOfPatients.splice(req.patient);
  res.status(204).send();
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

module.exports = {};
