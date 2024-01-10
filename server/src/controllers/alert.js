const { createAlert } = require("../services/alert.service")

const addAlert=async(req,res)=>{
    try {
        const newAlert=await createAlert(req.body)
        if(!newAlert){
            return res.json({
                message:"inputs non valid"
            })
        }
        res.status(200).send(true)
    } catch (error) {
        res.json({
            type:error.message
        })
    }
}

module.exports={
    addAlert
}