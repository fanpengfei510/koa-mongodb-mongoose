const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name : {
    type : String,
    required : true,  // 是否为必填
    unique : true   // 是否是唯一的
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  isAdmin : {
    type : Boolean,
    default : false
  },
  meta : {
    caeateAt : {
      type : Date,
      default : Date.now()
    }
  }
})

module.exports = mongoose.model('User',UserSchema,'user')