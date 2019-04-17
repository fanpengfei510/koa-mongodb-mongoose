const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApprovalSchema = new Schema({
  label : {
    type : String,
    required : true
  },
  userId : {
    type : Schema.Types.ObjectId,
    required : true
  },
  approvalType : {
    type : String,
    required : true
  },
  process : {
    type : Array,
  },
  day : String,
  state : {
    type : String,
    default : 'ing'
  },
  startTime : Date,
  endTime : Date,
  note : String
})

module.exports = mongoose.model('Approval',ApprovalSchema,'approval')