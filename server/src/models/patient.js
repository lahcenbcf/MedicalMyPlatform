const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const visiteShema=new mongoose.Schema({
    date:{
        type:String
    },
    datetoReady:{
        type:String
    },
    diagnostic:{
        data:Buffer,
        typeContent:String
    },
    description:{
        type:String
    },
    result:{
        type:String
    }
})
const Visite=mongoose.model("Visite",visiteShema)
const patientSchema=new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
        },

    dateBirth:{
        type:Date
    },
    sexe:{
        type:String,
        enum:["male","female"]
    },
    visites:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Visite"
    },
    gs:{
        type:String,
        enum:["B+","B-","A+","A-","AB+","AB-","O+","O-"],
        default:"O+"
    },
    poids:{
        type:Number
    },
    taille:{
        type:String
    },
    nm:{
        type:String
    },
    antécédentsMedicales:{
        type:Array
    }
})


const Patient=mongoose.model("Patient",patientSchema);

module.exports={
    Patient,
    Visite
}