const router = require('express').Router();
const path = require('path');

router.get('/index.html/:Eventname',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html/index.html'));
});

router.get('/portal.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html/portal.html'));
});

router.get('/form.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html/form.html'));
});

router.get('/createEvent.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html/createEvent.html'));
});

router.get('/thankyou.html',(req,res)=>{
    res.sendFile(path.join(__dirname,'../html/thankyou.html'));
});

module.exports = router;