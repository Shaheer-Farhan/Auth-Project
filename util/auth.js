//Stateful


// const sessionIdToUserIdMap = new Map();

// function setUser(id, user){
//     sessionIdToUserIdMap.set(id, user);
// }

// function getUser(id){
//     return sessionIdToUserIdMap.get(id);
// }

// export { setUser, getUser }; 

//Stateless 

import jwt from "jsonwebtoken";

function setUser( user){
    const payload = {
    _id : user._id,
    email: user.email,
    username: user.username,

    }
    return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {expiresIn : process.env.JWT_TOKEN_EXPIRY})
}

function getUser(token){
    try{
        return jwt.verify(token, process.env.JWT_TOKEN_SECRET)
    }catch(e){
        return null
    }
}

export{setUser,getUser}