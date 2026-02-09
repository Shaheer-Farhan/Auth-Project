import { getUser } from "../util/auth.js";

async function restrictToLoggedinUserOnly(req, res, next){
    const userUid = req.cookies?.uid;

    if(!userUid){
        return res.redirect("/login");
    }

    const user = getUser(userUid);

    if(!user){
        return res.redirect("/login");
    }
   
    
    
    req.user = user; // Attach user to request object for further use
    
    next()
}

export {restrictToLoggedinUserOnly}