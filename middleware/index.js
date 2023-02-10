const fs = require('fs');
const path = require('path');
const {verifyJwt} = require("../helpers/jwt");

const some = (req,res,next)=>{
    console.log("You made request");
    next();
};

const isOuth = (req,res,next)=>{
    const {authorization:key} = req.headers;
    console.log(key);

    const users = JSON.parse(
        fs.readFileSync(path.join(__dirname,"../Users.json"),{encoding : "UTF-8"})
    );
    
    const user = users.find(u=>u.api_key==key);
    if(user) next();
    else res.send("Not Authorized");
}

const validateSignUp = (req,res,next)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password) res.send("Invalid Feilds!!");
    else {
        const users = JSON.parse(
            fs.readFileSync(path.join(__dirname,"../Users.json"),{encoding : "UTF-8"})
        );
        if(users.find(user=>user.email==email)) return res.send("User Already exists!!");
        return next();
    }
};

const validateLogIn = (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password) res.send("Invalid LogIn!!");
    else return next();
};

const isAuthorized = (req,res,next)=>{
    const {auth:token} = req.headers;
    if(verifyJwt(token)) return next();
    else return res.send("Access denied!!");
}
module.exports = {
    some,
    isOuth,
    validateSignUp,
    validateLogIn,
    isAuthorized,
};