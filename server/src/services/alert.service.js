const {Alert}=require("../models/alert")
const createAlert=async(alert)=>{
    try {
        const newalert=new Alert(alert)
        const err=newalert.validateSync()
        if(err?.message){
            return false
        }
        await newalert.save()
        return true
    } catch (error) {
        return false
    }
}


module.exports={
    createAlert
}