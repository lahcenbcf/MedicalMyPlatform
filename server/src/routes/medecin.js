const express=require('express')
const medRouter=express.Router()
const {addRendezVous,getRendezVous}=require('../controllers/rendezVousController')


medRouter.post("/addRv",addRendezVous)
medRouter.get("/",getRendezVous)


module.exports={
    medRouter
}