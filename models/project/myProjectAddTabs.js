const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MyProjectAddTabs = new Schema({
  title : {
    type : String,
    required : true
  },
  style : String,
  createTime : {
    type : Date,
    default : Date.now()
  }
})

module.exports = mongoose.model('MyProjectAddTabs',MyProjectAddTabs,'myProjectAddTabs')