const express=require("express")
const { addPatient, addVisite, getPatients,updatePatient, updateVisite, deletePatient,getPatient} = require("../controllers/patientController")
const patientRouter=express.Router()


patientRouter.post("/addPatient",addPatient);
patientRouter.patch("/addVisit",addVisite);
patientRouter.get("/:medId",getPatients)
patientRouter.patch("/updatePatient",updatePatient)
patientRouter.patch("/updateVisite",updateVisite)
patientRouter.delete("/deletePatient",deletePatient);
patientRouter.get("/getPatient/:patientId",getPatient);

module.exports={
    patientRouter
}