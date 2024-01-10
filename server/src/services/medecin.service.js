const {Medecin} = require('../models/medecin')
const { createToken } = require('../jwt')
const {ObjectId}=require("mongodb")
const bcrypt=require("bcryptjs")
const register=async(medInfo)=>{
    try {
        //validate medInfo
        const medecin = new Medecin(medInfo)
        const error = medecin.validateSync()
        if(error?.message){
            return {
                message:error.message
            }
        }
        //check if the medecin instance exist 
        const med=await Medecin.findOne({
            email:medInfo?.email
        })
        if(med) return {
            message:"user exist with this email"
        }
        console.log("called")
        await medecin.save()
        return true
    } catch (error) {
        return {
            message:error.message
        }
    }
}

const login=async(authInfo)=>{
    try {
        const medecin=await Medecin.findOne({
            email:authInfo.email
        })
        const equal=medecin.comparePassword(authInfo.password)
       if(medecin && equal){
        const token = createToken(medecin._id.toString());
        return {
            ...medecin._doc,
            token
        }
       }else{
        return {
            message:"password or email not valid !"
        }
       }
    } catch (error) {
        return {
            message:error.message
        }
    }
}

const updateInfo=async(data)=>{
    console.log("called")
    try {
        let res;
        if(data?.password){
             res=await Medecin.findByIdAndUpdate({
                _id:new ObjectId(data._id)
            },{$set:{...data,password:bcrypt.hashSync(data.password,10)}})
        }else{
            res=await Medecin.findByIdAndUpdate({
                _id:new ObjectId(data._id)
            },{$set:{...data}})
        }
        
        if(res){
            return true
        }else{
            return {
                message:"some thing went wrong"
            }
        }
    } catch (error) {
        return {
            message:error.message
        }
    }
}

module.exports={
    register,
    login,
    updateInfo
}