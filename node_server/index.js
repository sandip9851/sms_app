
//this server site will handel the web socket connnection

//socket port

const io = require('socket.io')(8000,{
  cors: {
      origin : 'http://127.0.0.1:5500', // Allow requests from this origin
      methods: ['GET', 'POST', 'PUT'], // Allowed methods
      allowedHeaders: ['Content-Type'], // Allowed headers
      credentials :true
  }
});






//here will store initial data

let user = {}

//here io is instance of socket and on means recieve so it will recieve every socket connction

io.on("connection",Socket =>{ 
//here socket.on is handeling what is happening with the particular connection

//its wait for new user joined when new user joined client server will emit this event , and after getting emit socket.on will call callabck

  Socket.on("newConnectionJoined" , userName =>{
    console.log("testing",userName)
    user[Socket.id] = userName;

//after joined new user via socket to broadcast send data to client and it will reflect on every connection excluding new connection

    Socket.broadcast.emit("newConnection",userName)
  });


//another socket is handeling if recieved send message

Socket.on("sendMsg", message=>{
  //if socket recived some messages then socket will send it to all via emmit 

  Socket.broadcast.emit("recivedMsg",{message : message, userName : user[Socket.id] })

})


/*socket.on("disconnect", update =>{
  socket.broadcast.emit("leave",user[socket.id]);
  delete user[socket.id]
})*/


})


