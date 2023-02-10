const express = require('express');
const cors = require('cors');
const authRoutes = require('./router/auth');
const eventRoutes = require('./router/event');
const viewsRoutes = require('./router/views');
const connectDB = require('./helper/db');

const app = express();

connectDB();

app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.static(__dirname));

app.use("/auth",authRoutes); 
app.use("/event",eventRoutes); 
app.use("/",viewsRoutes); 

app.listen(8080,()=>{
    console.log(`Server Started at port : ${8080}`);
});