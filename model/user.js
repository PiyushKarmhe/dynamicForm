const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2
    },
    userName: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    notes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Note'
    }]

},{timestamps: true});

UserSchema.pre('save',function(next){
    if(this.password.length<5){
        next(new Error('Password must be atleast 5 characters'));
    }
    else {
        const {password} = this;
        console
        this.password = bcrypt.hashSync(password,10);
        console.log(this);
        // next();
    }
});

const User = new mongoose.model('User',UserSchema);

module.exports = User;