const mongoose =require("mongoose")
const bcrypt=require("bcryptjs")
const {Patient}=require("./patient")
const {Image}=require("./Image")
const medecinSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    patients:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Patient"
    },
    password:{
        type:String
    },
    domain:{
        type:String,
        default:""
    },
    dateDebutTravail:{
        type:String,
        default:""
    },
    lieuDeTravail:{
        type:String,
        default:""
    },
    sexe:{
        type:String,
        default:""
    },
    profilePic:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Image"
    }
})

medecinSchema.pre("save",async function(next){
    console.log("called")
    if(!this.isModified("password")){
        next()
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPass=bcrypt.hashSync(this.password,salt)
    this.password=hashedPass
})

const Medecin=mongoose.model("Medecin",medecinSchema)

Medecin.prototype.comparePassword=function(enteredPass){
    try {
        const isEqual= bcrypt.compareSync(enteredPass,this.password);
        return isEqual
    } catch (error) {
        return false
    }
}

module.exports={
    Medecin
}

