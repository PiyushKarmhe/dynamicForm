const mongoose = require('mongoose');
const mongoURL = "YOUR_CONNECTION STRING";
const connectDB = async () =>{
    try {
        await mongoose.connect(mongoURL);     
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;