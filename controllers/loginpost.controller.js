 import User from "../models/user.model.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../util/auth.js";  
import fs from 'fs' ;
import path from 'path';
const logPath = path.join(process.cwd(), "Login.log");


const loginpost = async(req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.render('login', { error: 'Email and password are required.' });
    }

  
   
    try {
      // Step 1: Find user by email
      const myUser = await User.findOne({ email });
      if (!myUser) {
         const logMessage = `${new Date().toLocaleString()} ${email}, &${password} => email not found\n`;
          fs.appendFile(logPath, logMessage, (err) => {
            if (err) console.error("Failed to login", err)});
        return res.render("login", { error: "Email or password is incorrect." });
      }
  
      // Step 2: Compare passwords
      const isMatch = await myUser.comparePassword(password); // calls your bcrypt.compare method
  
      if (!isMatch) {
        const logMessage = `${new Date().toLocaleString()} ${email}, & ${password}=> has failed to login (wrong password)\n`;
        fs.appendFile(logPath, logMessage, (err) => {
          if (err) console.error("Failed to login", err);
        });
        return res.render("login", { error: "Email or password is incorrect." });
      }
    
      if (myUser.isAdmin === true) {
        // const sessionId = uuidv4(); stateful
        // setUser(sessionId, myUser); statefull
         // Generate a unique session ID

        const token = setUser(myUser)
        // res.cookie("uid", sessionId); // Set the session ID in a cookie (stateful)
        res.cookie("uid", token, { httpOnly: true, secure: true , sameSite : "strict"}); // Set the session ID in a cookie (stateless)
        const logMessage = `${new Date().toLocaleString()} ${email}, => has logged in successfully\n`;
        fs.appendFile(logPath, logMessage, (err) => {
          if (err) console.error("Failed to login", err);
        });
        return res.redirect("/login/portal");
      } else {

        const logMessage = `${new Date().toLocaleString()} ${email}, => tried to login but is not an admin\n`;
        fs.appendFile(logPath, logMessage, (err) => {
          if (err) console.error("Failed to login", err);
        });
        return res.render('login', { error: 'Email or password is incorrect.' });
      }
    } catch (err) {
      console.error(err);
      fs.appendFile(logPath, `${new Date().toLocaleString()} ${email}, => server error during login\n`, (err) => {
        if (err) console.error("Failed to login", err);
      });
      res.status(500).send({ message: "Server error" });
    }

}

export default loginpost
   