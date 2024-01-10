const mongoose=require("mongoose")
const {Medecin}=require("./medecin")
const medecVerification=new mongoose.Schema({
    email:{
        type:String
    },
    code:{
        type:Number}
})

medecVerification.statics.emailFound=async(email)=>{
    try {
        console.log(email)
        const emailFound = await Medecin.findOne({
            email
        })
        if(emailFound){
            return true
        }
        return false
    } catch (error) {
        return false
    }
}

medecVerification.statics.addVerification=async(data)=>{
    try {
        const res = await medVerification.create(data);
        
        return res
    } catch (error) {
        return false
    }
}

medecVerification.statics.verifyEmail=async(codeEntered,email)=>{
    try {
        const emails=await medVerification.find({
            email
        });
        console.log(emails)
        if(emails.length <=0){
            return false
        }
        else {
            const lastEmail=emails[emails.length-1]
            if(lastEmail.code == codeEntered){
                //remove from DB
                await medVerification.deleteOne({
                    email
                })
                return true
            }else{
                return {
                    message:"code entered is non valid !"
                }
            }
        }
    } catch (error) {
     return {
        message:error.message
     }
    }
}


const medVerification=mongoose.model("medVerification",medecVerification)


module.exports={
    medVerification
}