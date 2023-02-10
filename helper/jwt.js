const jwt = require("jsonwebtoken");
const secret = "PiyushKarmhe";
// const payload = {
//     "name": "Piyush3",
//     "email": "karmhepiyush3@gmail.com",
//     "password": "piyush@117",
// }

// const token = jwt.sign(payload,secret,{
//     expiresIn:"100s"
// });

// console.log(token);

// const isVerified = jwt.verify(token,secret);

// console.log(isVerified);

const generateJwt = (payload) => jwt.sign(payload,secret,{expiresIn:"1d"});

const verifyJwt = (token) =>{
    try {
        const data = jwt.verify(token,secret);
        if(data) return true;
        else return false;
    } catch (error) {
        return false;
    }
}

const decodeJwt = (payload) => jwt.decode(token);

module.exports = {
    generateJwt,
    verifyJwt,
    decodeJwt
}