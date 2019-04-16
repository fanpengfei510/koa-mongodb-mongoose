const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  type : String,
  label : String,
  belongs : String,
  createTime : Date,
  head : String,
  amount : Number,
  startTime : Date,
  endTime : Date,
  state : Number,
  userId : {
    type : Array,
    required : true
  }
})

module.exports = mongoose.model('TaskSchema',TaskSchema,'task')