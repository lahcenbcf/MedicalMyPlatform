const { createRendezVous } = require('../services/rendez.service');
const { rendezVous } = require('../models/rendezVous');
const { SocketManager } = require('../classes/SocketManager');
const {format}=require("date-fns")
const scheduel=require("node-schedule");
const {returnDate}=require("../utils/index")
const { createAlert } = require('../services/alert.service');
const addRendezVous = async (req, res) => {
  try {
    const rv = await createRendezVous(req.body);
    if (!rv) {
      return res.json({
        message: 'input invalid !',
      });
    } else {
      return res.status(200).send(true);
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

let rendezVousList = [];
const socket = new SocketManager();
let part1;
let part2;
const getRendezVous = async (req, res) => {
  try {
    const rendezVouslist = await rendezVous.find();
    if (!rendezVousList.length) {
      rendezVousList = rendezVouslist;

      rendezVousList.forEach((rv) => {
        const appointment=returnDate(rv.date)
        const job = scheduel.scheduleJob(appointment, () => {
          // Emit a notification to the doctor when the scheduled time is reached
          socket.emitSocket(
            "appointmentNotification",
            `You have an upcoming appointment with ${rv.patientname}.`
          );
          //save to DB as Alerts
          const alert=createAlert({
            date:format(Date.now(),"yyyy-MM-dd at HH:MM"),
            contenu:`You have an upcoming appointment in 1 hour with ${rv.patientName}`
          })
        });
      });
    }
    res.json(rendezVouslist);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

module.exports = {
  addRendezVous,
  getRendezVous,
};
