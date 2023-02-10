const router = require('express').Router();
const {User} = require('../model/model_export');

router.post('/register', async (req,res)=>{
    try {
        const { firstName, lastName, userName, email, password} = req.body;
        const user = new User({ firstName, lastName, userName, email, password});
        // await user.save();
        res.send(user);
    } catch (error) {
        res.send(error.message);
    }
})

module.exports = router;