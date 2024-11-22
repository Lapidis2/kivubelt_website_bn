 const mongoose = require('mongoose');
 const userSchema = new mongoose.Schema({

     name: {
         type: String,
         require: true
     },
     email: {
         type: String,
         require: true,
         // unique: true,
         lowercase: true
     },
     password: {
         type: String,
         require: true,
         // unique: true
     },
     role: {
         type: String,
         default: 'guest'
     },
     createdAt: {
         type: Date,
         default: Date.now()
     },
     isConfirmed: {
         type: Boolean,
         default: false
     },
     confirmToken: {
         type: String
     }
 })

 const User = mongoose.model('user', userSchema);
 module.exports = User;