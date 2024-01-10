const express=require("express")
const { registerMed, loginMed,uploadP, forgotPassword, confirmEmail, logout, updateMedInfo, changePassword,getMedInfo,updatePic } = require("../controllers/medecinController")
const authRouter=express.Router()

authRouter.post("/register",registerMed)
authRouter.post("/login",loginMed)
authRouter.post("/forgetPassword",forgotPassword)
authRouter.post("/confirmMail",confirmEmail)
authRouter.get("/logout",logout)
authRouter.patch("/update",updateMedInfo)
authRouter.patch("/changePass",changePassword);
authRouter.get("/getMed/:medId",getMedInfo)


module.exports={
    authRouter
}