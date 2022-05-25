const mongoose = require("mongoose")

const MONGO_DB_CONNECTION = async function(MONGODB_COONECT_URL){
    try {
        mongoose.connect(MONGODB_COONECT_URL).then(()=>{
            console.log("mongodb connected")
        })
    } catch (error) {
        console.log("ERROR from mongodb connection", error)
    }
}

module.exports = MONGO_DB_CONNECTION