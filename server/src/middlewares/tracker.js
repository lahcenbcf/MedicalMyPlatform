const {addHistory}=require('../services/history.service')
const {format}=require("date-fns")
const tracker=(req,res,next)=>{
    const newDate= format(new Date(),"MM/dd/yyyy 'at' h:mm a")
    try {
        switch (req.path) {
            case "/auth/register":
                addHistory({
                    date:newDate,
                    titre:"you have created an acoount successufully"
                })
                break;
            case "/auth/login":
                addHistory({
                    date:newDate,
                    titre:"you have logged successufully"
                })
                break;
            case "/auth/update":
                addHistory({
                    date:newDate,
                    titre:"you have updated your account information successufully"
                })
                break;
            case "/patient/addPaient":
                addHistory({
                    date:newDate,
                    titre:`you have added a new patient ${req.body.firstname + " "+ req.body.lastname} an acount successufully`
                })
                break;
            case "/patient/removePatient":
                addHistory({
                    date:newDate(),
                    titre:`you have removed successufully the patient ${req.body.firstname + " "+ req.body.lastname}`
                })
            case "/patient/updatePatient":
                addHistory({
                    date:newDate(),
                    titre:`you have updated the information of ${req.body.firstname + " "+ req.body.lastname} successufuly`
                })
            case "/patient/addVisite":
                addHistory({
                    date:newDate(),
                    titre:"you have added suit case (visit) to patient record"
                })
            default:
                break;
        }
        next()
    } catch (error) {
        
    }
}

module.exports={
    tracker
}