const mongoose=require("mongoose")
const notificationSchema=new mongoose.Schema({
    date:{
        type:String
    },
    contenu:{
        type:String
    }
})

const NotModel=mongoose.model('NotModel',notificationSchema)

module.exports={
    NotModel
}