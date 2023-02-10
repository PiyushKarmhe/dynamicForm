const router = require('express').Router();
const {Event, Participant} = require('../model/model_export');

router.post('/registerEvent', async (req,res)=>{
    try {
        const {name, description, multipleResponse, poster, date, time, venue, text, checkbox, radio} = req.body;
        const event = new Event({name, description, multipleResponse, poster, date, time, venue, text, checkbox, radio});
        await event.save();
        res.send(event);
    } catch (error) {
        res.send(error.message);
    }
});

router.post('/registerParticipant', async (req, res)=>{
    try {
        console.log(req.body);
        const {name, text, checkbox, radio} = req.body;
        const participant = new Participant({name, text, checkbox, radio});
        await participant.save();
        console.log(participant);
        res.send(participant);

    } catch (error) {
        res.send(error.message);
    }
});

router.get('/registeredEvent/:Eventname', async (req,res)=>{
    try {
        const {Eventname} = req.params;
        const event = await Event.find({name:Eventname}).select("-_id");
        res.send(event);
    } catch (error) {
        res.send(error.message);
    }
});

router.get('/allEvents', async (req,res)=>{
    try {
        const event = await Event.find({}).select("-_id");
        res.send(event)        
    } catch (error) {
        res.send(error.message);
    }
})

router.get('/getParticipants/:Eventname', async (req,res)=>{
    try {
        const {Eventname} = req.params;
        const participants = await Participant.find({name:Eventname});
        res.send(participants);
    } catch (error) {
        res.send(error.message);
    }
});

router.put('/toggleEventStatus', async (req,res)=>{
    try {
        const {name, active} = req.body; 
        const event = await Event.updateOne({name:name},{active:active});
        console.log("here",req.body);
        res.send(event);
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;