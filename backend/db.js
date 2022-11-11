const mongoose  = require("mongoose");

const mongoURI ="mongodb+srv://sparshSM:Sparsh01@cluster0.o2rxg.mongodb.net/notebook"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected successfully")
    })
}

module.exports = connectToMongo;