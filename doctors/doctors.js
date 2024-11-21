const express = require("express");
const app = express();
const patientsRouter = express.Router();
const bodyParser = require('body-parser')

let listOfDoctors = []; // CALL FROM DB

app.use("/listOfPatients", patientsRouter);
app.use(bodyParser.json)
app.param("id", (req, res, next, id) => {
    
}) 

// GET ALL PATIENTS
patientsRouter.get("/", (req, res, next) => {
  res.send(listOfPatients);
});

// GET UNIQUE PATIENT
patientsRouter.get("/:id", (req, res, next) => {
  const requestID = req.params.id;
  const exists = listOfPatients[requestID];
  if (exists) {
    res.status(200).send(listOfPatients[requestID]);
  } else {
    res.status(404).send();
  }
});

// CREATE NEW DOCTOR

// UPDATE DOCTOR PROFILE

// DELETE DOCTOR PROFILE