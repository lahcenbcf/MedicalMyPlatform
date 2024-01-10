const socketIo=require("socket.io")

let instance;

class SocketManager{
        constructor() {
            if (instance) {
              return instance;
            }
            instance = this;
          }

    startSocket(server){
        this.io=socketIo(server);
        server.listen(5000,()=>console.log("server running ...."))
    }

    emitSocket(action,message){
        this.io.emit(action,message);
    }

}

module.exports={
    SocketManager
}
