const { ObjectId } = require("mongodb")
const {Patient}=require("../models/patient")
const {Visite}=require("../models/patient")
const {addPat}=require("../services/patient.service")
const {createVisite}=require("../services/visite.service")
const { format } = require("date-fns")
const {returnDate}=require("../utils/index")
const { Medecin } = require("../models/medecin")

const getPatients=async(req,res)=>{
    try {
        const {medId}=req.params
        const medecin = await Medecin.findOne({
            _id:new ObjectId(medId)
        })
        console.log(medecin)
        const patients=await Promise.all([
            ...medecin.patients.map(async p => await Patient.findOne({
                _id:new ObjectId(p._id)
            }))
        ])
        console.log(patients)
        res.json(patients)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

const addPatient=async(req,res)=>{
    try {
        const {medId,patientData}=req.body
        const response = await addPat(patientData)
        if(response?.message){
            return res.json(
                {
                    message:response.message
                }
            )
            
        }else{
            const {patients}=await Medecin.findById(medId).select("patients")
            console.log(patients)
            await Medecin.findByIdAndUpdate(medId,{
                $set:{
                    patients:[...patients,response]
                }
            })

            return res.status(201).send(true)
        }
    } catch (error) {
        res.json(
            {
                message:error.message
            }
        )
    }
}


const getPatient=async(req,res)=>{
    try {
        const {patientId}=req.params;
        const patient=await Patient.findById(patientId);
        if(patient && patient?.visites?.length){
            //get visites
            const visites=Promise.all([...patient.visites.map(async v => await Visite.findById(v._id))])
            console.log(visites)
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }   
}

const updatePatient=async(req,res)=>{
    try {

        const {data,patientId}=req.body;
        const response=await Patient.findByIdAndUpdate({
            _id:new ObjectId(patientId)
        },{$set:{...data}});

        if(response){
            res.status(200).send(true)
        }else{
            res.json({
                message:"someting went wrong"
            })
        }

    } catch (error) {
        res.json(
            {
                message:error.message
            }
        )
    }
}

const addVisite=async(req,res)=>{
    try {
        const {visitData,patientId}=req.body;
        visitData.dateToReady=returnDate(visitData.date)
        const err=await createVisite(visitData)
        if(!err){
            res.json({
                message:"visit data invalid"
            })
        }
        
        console.log(req.body)
        const getVisits=await Patient.findOne({
            _id: new ObjectId(patientId)
        }).select("visites")
        const response = await Patient.findByIdAndUpdate({
            _id:new ObjectId(patientId)
        },{
            $set:{visites:[
                ...getVisits.visites,err
            ]}
        })
        if(response){
            res.send(true)
        }else{
            res.json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}


const updateVisite=async(req,res)=>{
    try {
        const {visit_id,newVisitInfo}=req.body;
        const visit=await Visite.findOneAndUpdate({
            _id:new ObjectId(visit_id)
        },{
            $set:{
...newVisitInfo
            }
        })
        if(visit){
            res.status(200).send(true)
        }else{
            res.json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

const deletePatient=async(req,res)=>{
    try {
        const {patientId}=req.body;
        const result = await Patient.deleteOne({
            _id:new ObjectId(patientId)
        })

        if(result?.acknowledged) {return res.status(200).send(true)}else{
            return res.json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

module.exports={
    getPatients,
    addPatient,
    addVisite,
    updatePatient,
    updateVisite,
    deletePatient,
    getPatient
}

