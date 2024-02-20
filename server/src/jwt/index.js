nv=require('dotenv').config()
const TOKEN_SECRET=process.env.Secret_Jwt
const jwt = require("jsonwebtoken")
const createToken=(userId)=>{
    return jwt.sign({
        _id:userId
    },TOKEN_SECRET,{
        expiresIn: "24h"
    })
}   


module.exports={
    createToken
}