import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

//ROUTES IMPORT
import homeRoute from "./routes/home.route.js"
import booking from "./routes/booking.route.js"
import portal from "./routes/portal.route.js"
import login from "./routes/login.route.js"
import loginpost from "./routes/loginpost.route.js"

//MIDDLEWARE IMPORT
import {restrictToLoggedinUserOnly} from "./middlewares/auth.js"

// import portalrouter from "./routes/portal.route.js"

//App Config

app.set("view engine", `ejs`)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())


// TESTING MIDDLEWARE
// app.use((req,res) =>{ 
//     console.log(`Testing start `);
    
// })

app.use("/", homeRoute)
app.use("/login" , login)
app.use("/login/portal", restrictToLoggedinUserOnly, portal)
// app.use(portalrouter)
app.use("/booking" , booking)
app.use("/login" , loginpost)

app.use((req, res) => {
  res.redirect("/"); // always send them to home
});


export default app