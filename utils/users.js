const users=[];

//join user to a chat

function userJoin(id,username,room){
const user={id,username,room};

users.push(user)

return user;

}

//get current user

function getCurrentUser(id){
return users.find(user=>user.id===id)
}

//user leaves chat

function userLeave(id){
   const index= users.findIndex(user=>user.id===id)
//return -1 if it doesnt find the index
if(index!==-1)
{
    //if it finds then splice meaning return the users array without that user
    return users.splice(index,1)[0] //cutting the index by only 1
}

}

function getRoomUsers(room){


    return users.filter(user=>user.room===room)


}






module.exports={
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};