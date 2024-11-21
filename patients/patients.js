const express = require("express");
const app = express();
const patientsRouter = express.Router();
const bodyParser = require("body-parser");

let listOfPatients = []; // CALL FROM DB

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

// UPDATE PATIENT PROFILE

// DELETE PATIENT PROFILE

// ERROR HANDLER
const errorHandler = (err, req, res, next) => {
  let errorStatus = err.status;
  if (!errorStatus) {
    errorStatus = 500;
  }
  res.status(errorStatus).send(err.message);
};
app.use(errorHandler);
