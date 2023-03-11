const mongoose = require('mongoose');
const mongoURL = "YOUR_MONGODB_CONNECTION_STRING";
//"mongodb+srv://xxxx:xxxx@cluster0.1byv3sz.mongodb.net/aiclub"
const connectDB = async () =>{
    try {
        await mongoose.connect(mongoURL);     
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;