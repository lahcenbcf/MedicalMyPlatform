const mongoose=require('mongoose')
const {Patient}=require("./patient")
const rendezVousSchema=new mongoose.Schema({
    date:{
        type:String
    },
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
    patientName:{
        type:String
    }
})

const rendezVous=mongoose.model("rendezVous",rendezVousSchema)

module.exports={
    rendezVous
}