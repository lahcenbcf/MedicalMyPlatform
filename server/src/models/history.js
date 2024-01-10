const mongoose=require("mongoose")
const historyItemSchema=new mongoose.Schema({
    titre:{
        type:String
    },
    date:{
        type:String
    }
})


const historyItem=mongoose.model("hsitoryItem",historyItemSchema)

module.exports={
    historyItem
}