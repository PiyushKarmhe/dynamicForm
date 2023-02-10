const mongoose = require('mongoose');

const participantsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    text:[{
        question:{
            type: String,
            minlength:3,
            required: true
        },
        ans:{
            type: String,
            minlength:2,
            required: true
        }
    }],
    checkbox:[{
        question:{
            type: String,
            minlength:3,
            required: true
        },
        options:[{
            type: String,
            required: true
        }]
    }],
    radio:[{
        question:{
            type: String,
            minlength:3,
            required: true
        },
        ans:{
            type: String,
            required: true
        }
    }],
},{timestamps: true});

participantsSchema.pre('save',function(next){
    console.log(this);
    next();
});

const Participant = new mongoose.model('participant',participantsSchema);

module.exports = Participant;