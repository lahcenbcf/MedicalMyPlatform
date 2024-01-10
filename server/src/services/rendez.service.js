const {rendezVous}=require("../models/rendezVous")

const createRendezVous=async(data)=>{
    try {
        const rv=new rendezVous(data);
        const err=rv.validateSync()
        if(err?.message) return false;
        await rv.save()
        return true
    } catch (error) {
        return false
    }
}


module.exports={
    createRendezVous
}