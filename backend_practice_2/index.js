const express = require("express")
// const dotenv = require("dotenv")
const MONGODB_CONNECTION = require("./config/mongoDB_connection")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const globalErrorHandlerMiddleware = require("./middlewares/globalErrorHandling")
const fileUpload = require("express-fileupload")
const path = require("path")

// import routes
const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/orderRoute")
const bodyParser = require("body-parser")
const paymentRoute = require("./routes/paymentRoute")

const app = express()

// env file config
// ye config tab use hoga jab hum developement mode pe ho
// production  mode pe heroku khud apna config banata hai
// isiliye yaha condition ke sath isko rakhenge

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path : "backend_practice_2/config/.env"})
}


// setting middleware
app.use(cors())
// express.josn middleware compulsary hai, warna sab details dene se bhi validation failed dikhayega or likha hoga, please enter name, please enter category, please enter description etc jitne bhi fields hai sabko fill karne ke liye bolega jabki sab bhara hua hai
app.use(express.json({limit:"25mb", extended: true})) // jab 1 se jyada file frontend se ata hai toh ye error "request entity too large" ata hai, isse bachne ke liye limit 25mb karna hota hai
app.use(express.urlencoded({extended:true.valueOf, limit:"25mb"})) // jab 1 se jyada file frontend se ata hai toh ye error "request entity too large" ata hai, isse bachne ke liye limit 25mb karna hota hai
app.use(cookieParser())
app.use(express.urlencoded({extended:"true"}))
app.use(fileUpload()) // for image upload, packedge - express-fileupload , video time : 08:04:12 cloudinary

// routes
app.use("/api", productRoute)
app.use("/api", userRoute)
app.use("/api", orderRoute)
app.use("/api", paymentRoute)


// connecting front end with backend, here backend will only call on folder n that is build folder, so backend will call build, and from build we will route everywhere
// app.use(express.static(path.join(__dirname,"../frontend_1/build"))) // getting folder from backend
// app.get("*", (req, res, next)=>{
//     res.sendFile(path.resolve(__dirname,"../frontend_1/build/index.html")) // sending one by one file to ui/ frontend
// })

// if(process.env.NODE_ENV){
app.use(express.static(path.join(__dirname, "../frontend_1/build")))
app.get("*",(req, res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend_1/build/index.html"))
})
// }

///// ye build file ka path yaha set karne ke baad,
///// frontend se build folder ko delete kar denge
///// heroku pe host karte hi, heroku khud build folader bana lega
///// tab heroku ke banaye build folder se ye upar ka path ayega

app.use(globalErrorHandlerMiddleware)

// mongodb connection
MONGODB_CONNECTION(process.env.MONGO_DB_CONNEXTION_URL)


app.listen(process.env.PORT,()=>{
    console.log(`server started on http://localhost:${process.env.PORT}`)
})

// token--    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
    
    // removed from frontebd package.josn sript line  -- "build": "react-scripts build",

// ssh SHA256:aleVCB3Q9vuRy0vRtMaW0lQiK8UkXVoAP/XbhlSN08g pratap-bairagi.test@gmail.com

// node modules,
// packge.json,
// package-lock.json
// inn files ko backend folder ke bahar rakhna hai
// taki bahar wale folder se npm start command se
// backend bhi chale aur frontend bhi chale
// aur heroku pe bahar wala folder ko deploy karne se
// dono ko - frontend aur backend deploy ho jaye

// backend wale packege.json file mei
// script ke andar
// heroku ka config likhna hai taki deploy kiya jaa sake
// dono ke -- deps aur web deps install karna hai, jo heroku khudse kar lega
// is setting/ config ke baad
// "heroku-postbuild" likhna hai


// "heroku-postbuild" value pe ------- backend
// "NPM_CONFIG_PRODUCTION=false"
// isko false rakhne se, heroku app pe deps aur web deps dono install kar lega heroku app khudse
// isko true rakhne se sirf deps install karega heroku app khud
// ye backend ka deps aur web deps k setting h

// "heroku-postbuild" value pe ------- frontend
// "NPM_CONFIG_PRODUCTION=false && npm install --prefix frontend_1"
// npm intall --prefix se sab packege install karega khud heroku app
// jis folder ke andar ghus kar packeges install karna hai uska naam
// jaise humare is case mei 
// humes frontend_1 folder ke andar packeges ko install karwana hai
// ye wala setting backend jke setting ke baad & laga kar kiya jayega
// frontend ke folder ka jo naam hao wo naam dena hai
// jisse wahi wale folder ke andar jo jo packeges hai sab install kar lega khud heroku app

// ab frontend packeges intall ke baad
// frontend ke folder ko build karega
// npm run build se
// humare is folder structure aur file structer ke liye setting
// iska settings --- bilkul same aise spaces hoga setting pe
// "NPM_CONFIG_PRODUCTION=false && npm install --prefix frontend_1 && npm run build --prefix frontend_1"


// ab heroku pe deploy ke liye procfile create krna hai
// ye file backend folder ke bahar hoga
// uske andar backend ka path dena hai
// humare is folder structure aur file structer ke liye setting
// setting ---- bilkul same aise setting hoga spaces ka
// web: node backend_practice_2/index.js
