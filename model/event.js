const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const eventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true,
        minlength:3
    },
    poster:{
        type: String,
        required: true,
        minlength:3
    },
    date:{
        type: String,
        required: true,
        minlength:3
    },
    time:{
        type: String,
        required: true,
        minlength:3
    },
    venue:{
        type: String,
        required: true,
        minlength:3
    },
    multipleResponse: {
        type: Boolean,
        default:false
    },
    active:{
        type: Boolean,
        default:true
    },
    text:[{
        type: String,
        minlength:3,
    }],
    checkbox:[{
        question:{
            type: String,
            minlength:3
        },
        options:[String]
    }],
    radio:[{
        question:{
            type: String,
            minlength:3
        },
        options:[String]
    }],
},{timestamps: true});

eventSchema.pre('save',function(next){
    console.log(this);
    next();
});

const Event = new mongoose.model('Event',eventSchema);

module.exports = Event;