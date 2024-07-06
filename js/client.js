
const socket = io('http://localhost:8000')

const container = document.querySelector(".message-container");

const msgFrom= document.getElementById("msg_from");

const message = document.getElementById("inp")

const userName = prompt("Enter Your Name")



//send data to server side via emmit event

socket.emit("newConnectionJoined",userName)

//reciving data from server side

socket.on("newConnection", name => {
 displayData(`${name} joined the chat`,"right")

})

//create display function

function displayData (msg,position){
    let displayBox = document.createElement("div");
    displayBox.classList.add("message");
    displayBox.classList.add(position);
    displayBox.innerText = msg;
    container.append(displayBox)
    
}

msgFrom.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(message.value == ""){
        msgFrom.removeEventListener()
        document.querySelector("#btn").disabled = true;

    }  
    
    console.log("clicked")
    let msg = message.value;
    displayData(`You:${msg}`,"right")
socket.emit("sendMsg",msg)
message.value = ""

})


socket.on("recivedMsg", data => {
    displayData(`${data.userName} : ${data.message}`,"left")
   })

socket.on("leave",userName =>{
    displayData(`${userName} left the chat`,"right")

})
   