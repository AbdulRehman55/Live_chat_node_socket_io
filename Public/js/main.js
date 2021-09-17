const chatForm=document.getElementById('chat-form');
const socket=io();
const chatMessages=document.querySelector('.chat-messages');
const roomName=document.getElementById('room-name')
const userList=document.getElementById('users')
//get username and room from url
const {username,room}=Qs.parse(location.search,{
  ignoreQueryPrefix:true
})
console.log(username,room)

//Join chatroom
socket.emit('joinRoom',{username,room})

//get room and users
socket.on('roomUsers',({room,users})=>{
  outputRoomName(room);
  outputUsers(users)
})



// capture the msg we are sending from our server side

socket.on("message",(message)=>{
  console.log(message);
  outputMessage(message)




  //scroll down
  chatMessages.scrollTop=chatMessages.scrollHeight
})

//creating a event listner for sumbission the forn
//msg submit

chatForm.addEventListener('submit',(e)=>{

  e.preventDefault();
//Get msg text
  const msg=e.target.elements.msg.value;

//Emit msg to server
  socket.emit('chatMessage',msg)

  e.target.elements.msg.value='';
  e.target.elements.msg.focus();
})


//output msg to dom
function outputMessage(message){

const div=document.createElement('div');
div.classList.add('message');
div.innerHTML=`<p class="meta">${message.username}<span></span>${message.time}</p>
<p class="text">
${message.text}

</p>`

document.querySelector('.chat-messages').appendChild(div)
}

//Add room name to dom
function outputRoomName(room){

  roomName.innerText=room;

}

//Add users to DOM

function outputUsers(users){
  userList.innerHTML=`
  ${users.map(user=>`<li>${user.username}</li>`).join('')}
  `
}