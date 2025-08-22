const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required:[ true,"please provide a username"],
        unique:[true,"username must be unique"],
        
    },

    email: {
         type: String,
         required: [true, "please provide an email"],
         unique: true,
        
          },

    password: { 
        type: String,
        required:true,
        unique: true,
          },
    
    role :{ 
         type:Number   
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;