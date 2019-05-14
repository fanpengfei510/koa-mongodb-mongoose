const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserScheam = new Schema({
  username : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  email : {
    type : String,
  },
  isAdmin : {
    type : Boolean,
    default : false
  },
  mate : {
    createAt : {
      type : Date,
      default : Date.now()
    }
  }
})

module.exports = mongoose.model('User',UserScheam,'user')