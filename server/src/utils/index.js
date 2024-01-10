const returnDate=(dateStr)=>{
    const part1 = dateStr.split('at')[0];
        const part2 = dateStr.split('at')[1];
        //const appointmentDate = new Date(part1[0],part1[1],part1[2],part2[0],part2[1]);
        const appointment2=new Date(part1[0],part1[1],part1[2],part2[0],part2[1])
    return appointment2
}

module.exports={
    returnDate
}