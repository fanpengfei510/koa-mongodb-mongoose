const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MyProject = Schema({
  name : {
    type : String,
    required : true
  },
  head : String,
  amount : String,
  time : Array,
  tema : {
    type : Array,
  },
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