const { Medecin } = require('../models/medecin');
const { medVerification } = require('../models/medecineVerification');
const { register, login, updateInfo } = require('../services/medecin.service');
const fs=require("fs");
const nodemailer = require('nodemailer');
const bcrypt=require("bcryptjs")
const dotEnv=require("dotenv").config()
//set up the transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Auth_email,
    pass: process.env.App_password,
  },
});

const registerMed = async(req, res) => {
  try {
    const medInfo = req.body;
    //check if doctor info is validate
    const response =await register(medInfo);
    if (response?.message)
      return res.json({
        message: response.message,
      });
    return res.status(201).send(true);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const loginMed = async(req, res) => {
  try {
    const response = await login(req.body);
    if (response?.message) {
      return res.json({
        message: response.message,
      });
    } else {
      
      return res.status(200).json(response);
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const {email}=req.body
    const emailIsFound = await medVerification.emailFound(email);
    if (!emailIsFound) {
      res.json({
        message: 'email entered is false',
      });
    } else {
      //email found
      const code = Math.floor(Math.random() * 1000);
      const message = {
        from: process.env.Auth_email,
        to: req.body.email,
        subject: 'password reset',
        text: `please copy the code ${code} and paste it in the gaps , the code will expires within 12 hours`,
      };

      const response = await medVerification.addVerification({
        code,
        email,
      });
      if (response?.message){
        return res.json({
          message: 'something went wrong',
        })}else{
            console.log("called here")
        //bien inserted in userVerifications collection
        transporter.sendMail(message, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log(info);
          }
        });
        res.status(200).send(true)
      }
    }
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

const confirmEmail = async (req, res) => {
  try {
    const { code, email } = req.body;
    console.log(code,email)
    const response = await medVerification.verifyEmail(code, email);
    if(response?.message){
        return res.json({
            message : response.message
        })
    }else {
        res.send(true)
    }
  } catch (error) {
    res.json({
        message:error.message
    })
  }
};


const changePassword=async(req,res)=> {
  const {newPassword,_id}=req.body
  try {
      const result=await Medecin.findByIdAndUpdate(_id,{
        $set:{
          password:bcrypt.hashSync(newPassword,10)
        }
      })
      if(result) return res.status(200).send(true)
      return {
    message: "something went wrong !"
  }

  } catch (error) {
    res.json({
      message:error.message
    })
  }
}
const logout=async(req,res)=>{
    try {
        res.status(200).send(true)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}


const updateMedInfo=async(req,res)=>{
    try {
      console.log('wuiiii')
      const response = await updateInfo(req.body)
      if(response?.message){
        return res.json({
          message:response.message
        })
      }
      return res.send(true)
    } catch (error) {
      res.json(
        {
          message:error.message
        }
      )
    }
}


const getMedInfo=async(req,res)=>{
  try {
    const medId=req.params.medId;
    const medecin = await Medecin.findById(medId);
    return res.json(medecin)
  } catch (error) {
    res.json(
      {
        message:error.message
      }
    )
  }
}
/*
const uploadP=async(req,res)=>{
  try {
    console.log(req.body)
    const {imagePath,medId}=req.body
    var img = fs.readFileSync(imagePath);
    var encode_img = img.toString('base64'); 
   var final_img = { img: { contentType: req.file.mimetype, data: new Buffer(encode_img, 'base64'), }, extName: req.file.originalname.split('.')[1], };
    await Medecin.findByIdAndUpdate(medId,{
      $set:{profilePic:final_img}
    })

    const newMed=await Medecin.findById(medId);
    res.json(newMed);
  } catch (error) {
    res.json({
      message:err.message
    })
  }
}
*/

module.exports = {
  registerMed,
  loginMed,
  forgotPassword,
  confirmEmail,
  logout,
  updateMedInfo,
  changePassword,
  getMedInfo,
 
};
