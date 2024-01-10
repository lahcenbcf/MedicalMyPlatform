const { Visite } =require("../models/patient");
const createVisite=async(visite)=>{
    try {
        const newVisite = new Visite(visite);
        const error= newVisite.validateSync();
        if(error?.message){
            return false;
        }
        const visit = await newVisite.save()
        return visit
    } catch (error) {
        return false
    }
}


module.exports={
    createVisite
}