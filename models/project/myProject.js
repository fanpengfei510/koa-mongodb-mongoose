const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MyProject = Schema({
  title : {
    type : String,
    required : true
  },
  head : String,
  amount : Number,
  time : Date,
  userId : {
    type : Schema.Types.ObjectId,
    required : true
  },
  tabsId : {
    type : Schema.Types.ObjectId,
    required : true
  }
})

module.exports = mongoose.model('MyProject',MyProject,'myProject')