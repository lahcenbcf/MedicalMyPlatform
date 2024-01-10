const {historyItem}=require("../models/history")


const addHistory=async(hist)=>{
    try {
        const history = new historyItem(hist);
        const err=history.validateSync();

        if(err?.message){
            return false
        }
        await history.save()
        return true
    } catch (error) {
        return false
    }
}


module.exports={
    addHistory
}