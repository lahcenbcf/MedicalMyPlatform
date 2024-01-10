const express=require("express")
const cors=require("cors")
const {tracker}=require("./middlewares/tracker")
const app=express()
const fs=require("fs")
const {Image}=require("./models/Image")
const {medRouter}=require('./routes/medecin')
const {authRouter}=require("./routes/auth")
const {upload,uploadPhoto}=require("./upload")
const {connect}=require("./config")
const { patientRouter } = require("./routes/patient")
const {SocketManager}=require("./classes/SocketManager")
const path=require("path")
const http = require('http');
const server = http.createServer(app);

/*class SocketManager {
  constructor() {
    
  }




  startListeners() {
    this.io.on('connection', (socket) => {
      socket.on('event', (data) => {
        console.log(data)
      })
    })
  }

}
*/
/* middelwares */
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.use(express.static('public')); 

app.use(tracker)
connect()
app.use(cors())

app.use("/auth",authRouter)
app.use("/patient",patientRouter)
app.use("/med",medRouter)
app.post("/upload",upload.single("image"),uploadPhoto)
app.post("/uploadNormal",upload.single("file"),async(req,res)=>{
    res.send(req.file.path)
})

app.get("/",(req, res)=> {
  const options = {
      root: path.join(__dirname)
  };



  const fileName = 'index.html';
  res.sendFile(fileName, options, function (err) {
      if (err) {
          console.error('Error sending file:', err);
      } else {
          console.log('Sent:', fileName);
      }
  });
});






const socketInstance=new SocketManager()
socketInstance.startSocket(server)
