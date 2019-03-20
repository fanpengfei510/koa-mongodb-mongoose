const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MyProject = Schema({
  projectName : {
    type : String,
    require : true
  },
  codeType : String,
  projectCode : Number,
  planTime : {
    type : String,
    required : true
  },
  endTime : {
    type : String,
    required : true
  },
  doc : String,
  id : {
    type : Array,
    required : true
  }
})

module.exports = mongoose.model('MyProject',MyProject,'myProject')