const {Patient}=require('../models/patient')

const addPat=async(data)=>{
    try {
        console.log(data)
        const patient = new Patient(data);
        console.log("call hereJJJ")
        const isError=patient.validateSync()
        if(isError?.message){
            return {
                message:"inputs are not valid !"
            }
        }
        //check if patient already exist
        const patientFound=await Patient.findOne({
            email:data.email
        })
        if(patientFound) return {
            message :"patient already exist"
        }
        //add patient
        await patient.save()
        return patient._id

    } catch (error) {
        return {
            message :error.message
        }
    }
}


module.exports={
    addPat
}