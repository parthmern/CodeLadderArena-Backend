const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name : {
            type : String ,
            
        }, 

        email : {
            type : String ,
            required : true ,
            unique: true ,
        },

        createdAt : {
            type: Date ,
            default : Date.now(),
        },

        submissionsOfUser : [
            {
                type : mongoose.Schema.Types.ObjectId ,
                ref : 'submissions',
            }
        ]

    }
)

const user = mongoose.model('user', userSchema);
module.exports = user ;