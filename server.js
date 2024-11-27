const express = require("express");
const app = express();
const patientsRouter = require("./patients/patients");

app.use("/patients", patientsRouter);

const PORT = 4001;
// SERVER LISTENTING
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
