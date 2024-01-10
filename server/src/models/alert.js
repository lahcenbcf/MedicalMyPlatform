const mongoose =require("mongoose")

const alertSchema=new mongoose.Schema({
    date:{
        type:String,
    },
    titre:{
        type:String
    },
    type:{
        type:String
    }
})



const Alert=mongoose.model("Alert",alertSchema)

module.exports={
    Alert
}